import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mockSessions } from "@/data/mockSessions";
import type { Session } from "@/types/game session/Session";
import type { SessionSignup } from "@/types/game session/Signup";

const sessions = ref<Session[]>(mockSessions);

const currentUser = "New Member";
const currentMemberId = "member-new";

export function useSessions() {
  const route = useRoute();
  const router = useRouter();

  const hosts = computed(() => {
    return [...new Set(sessions.value.map((session) => session.host))];
  });

  const places = computed(() => {
    return [...new Set(sessions.value.map((session) => session.place))];
  });

  function getSession(id: number) {
    return sessions.value.find((session) => session.id === id);
  }

  const currentSession = computed(() => {
    return getSession(Number(route.params.id));
  });

  const confirmedSignups = computed(() => {
    return (currentSession.value?.signups ?? [])
      .filter((signup) => signup.status === "Confirmed")
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  });

  const waitingSignups = computed(() => {
    return (currentSession.value?.signups ?? [])
      .filter((signup) => signup.status === "Waiting")
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  });

  const confirmedCount = computed(() => {
    return confirmedSignups.value.length;
  });

  const seatsAvailable = computed(() => {
    if (!currentSession.value) return 0;

    return Math.max(0, currentSession.value.capacity - confirmedCount.value);
  });

  const currentSignup = computed(() => {
    return currentSession.value?.signups.find(
      (signup) => signup.memberId === currentMemberId,
    );
  });

  const isSignedUp = computed(() => {
    return currentSignup.value !== undefined;
  });

  function updateSessionStatus(session: Session) {
    const confirmed = session.signups.filter(
      (signup) => signup.status === "Confirmed",
    ).length;

    session.status = confirmed >= session.capacity ? "Full" : "Open";
  }

  function promoteWaitingSignups(session: Session) {
    const confirmedCount = session.signups.filter(
      (signup) => signup.status === "Confirmed",
    ).length;

    const seatsToFill = Math.max(0, session.capacity - confirmedCount);

    const waiting = session.signups
      .filter((signup) => signup.status === "Waiting")
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    waiting.slice(0, seatsToFill).forEach((signup) => {
      signup.status = "Confirmed";
    });

    updateSessionStatus(session);
  }

  // If capacity is reduced, the most recently signed-up confirmed
  // members lose their seats first.
  function reconcileCapacity(session: Session) {
    const confirmed = session.signups
      .filter((signup) => signup.status === "Confirmed")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const excessSeats = Math.max(0, confirmed.length - session.capacity);

    confirmed.slice(0, excessSeats).forEach((signup) => {
      signup.status = "Waiting";
    });

    promoteWaitingSignups(session);
  }

  function validateSession(
    name: string,
    date: string,
    time: string,
    place: string,
    host: string,
    capacity: number | null,
    minimumCapacity: number,
  ) {
    if (!name.trim()) return "Please enter a session name.";
    if (!date) return "Please select a date.";
    if (!time) return "Please select a time.";
    if (!place) return "Please select a place.";
    if (!host) return "Please select a host.";

    if (
      capacity === null ||
      !Number.isFinite(capacity) ||
      capacity < minimumCapacity
    ) {
      return `Capacity must be at least ${minimumCapacity}.`;
    }

    return "";
  }

  function createSession(input: {
    name: string;
    date: string;
    time: string;
    place: string;
    capacity: number | null;
  }) {
    const host = "Alice";

    const validationError = validateSession(
      input.name,
      input.date,
      input.time,
      input.place,
      host,
      input.capacity,
      1,
    );

    if (validationError) return validationError;

    const id = Math.max(0, ...sessions.value.map((session) => session.id)) + 1;

    const newSession: Session = {
      id,
      name: input.name.trim(),
      description: `A game session: ${input.name.trim()}`,
      host,
      date: input.date,
      time: input.time,
      place: input.place,
      capacity: input.capacity!,
      status: "Open",
      games: [],
      signups: [
        {
          id: crypto.randomUUID(),
          sessionId: id,
          memberId: "alice",
          status: "Confirmed",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    updateSessionStatus(newSession);

    sessions.value.push(newSession);
    router.push(`/view-session/${newSession.id}`);

    return "";
  }

  function updateSession(input: {
    date: string;
    time: string;
    place: string;
    host: string;
    capacity: number | null;
  }) {
    const session = currentSession.value;

    if (!session) return "Session not found.";

    const validationError = validateSession(
      session.name,
      input.date,
      input.time,
      input.place,
      input.host,
      input.capacity,
      2,
    );

    if (validationError) return validationError;

    session.date = input.date;
    session.time = input.time;
    session.place = input.place;
    session.host = input.host;
    session.capacity = input.capacity!;

    reconcileCapacity(session);

    router.push(`/view-session/${session.id}`);

    return "";
  }

  function signup(gameId?: number) {
    const session = currentSession.value;

    if (!session || isSignedUp.value) return;
    if (session.status === "Cancelled") return;

    const confirmed = session.signups.filter(
      (signup) => signup.status === "Confirmed",
    ).length;

    const status: SessionSignup["status"] =
      confirmed < session.capacity ? "Confirmed" : "Waiting";

    const newSignup: SessionSignup = {
      id: crypto.randomUUID(),
      sessionId: session.id,
      memberId: currentMemberId,
      status,
      createdAt: new Date().toISOString(),
      ...(gameId !== undefined ? { gameId } : {}),
    };

    session.signups.push(newSignup);

    updateSessionStatus(session);

    router.push(`/view-session/${session.id}`);
  }

  function cancelSignup() {
    const session = currentSession.value;

    if (!session) return;

    const signupIndex = session.signups.findIndex(
      (signup) => signup.memberId === currentMemberId,
    );

    if (signupIndex === -1) {
      router.push(`/view-session/${session.id}`);
      return;
    }

    const signup = session.signups[signupIndex];

    if (!signup) {
      router.push(`/view-session/${session.id}`);
      return;
    }

    session.signups.splice(signupIndex, 1);

    if (signup.status === "Confirmed") {
      promoteWaitingSignups(session);
    } else {
      updateSessionStatus(session);
    }

    router.push(`/view-session/${session.id}`);
  }

  function cancelSession() {
    const session = currentSession.value;

    if (!session) return;

    session.status = "Cancelled";

    router.push(`/view-session/${session.id}`);
  }

  function goToSessions() {
    router.push("/sessions");
  }

  return {
    sessions,
    currentUser,
    hosts,
    places,
    currentSession,
    confirmedSignups,
    waitingSignups,
    confirmedCount,
    seatsAvailable,
    getSession,
    createSession,
    updateSession,
    signup,
    cancelSignup,
    goToSessions,
    isSignedUp,
    cancelSession,
    currentSignup
  };
}

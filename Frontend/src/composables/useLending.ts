
import { ref, computed, watch } from 'vue'

export type BoxCondition = 'Nieuw' | 'Goed' | 'Redelijk' | 'Beschadigd'

export type RequestStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'

export interface LendingBox {
  id: string
  owner: string
  gameName: string
  condition: BoxCondition
  description: string
  available: boolean
  createdAt: string
}

export interface LendingRequest {
  id: string
  boxId: string
  member: string
  status: RequestStatus
  requestedAt: string
}

export interface LendingLoan {
  id: string
  boxId: string
  borrower: string
  startDate: string
  dueDate: string
  extended: boolean
  returnedDate: string | null
}

export const MAX_LOAN_DAYS = 21

const BOXES_KEY = 'spellentafel-lending-boxes'
const REQUESTS_KEY = 'spellentafel-lending-requests'
const LOANS_KEY = 'spellentafel-lending-loans'

function today(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T12:00:00`)
  date.setDate(date.getDate() + days)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') {
    return fallback
  }

  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const boxes = ref<LendingBox[]>(
  readStorage<LendingBox[]>(BOXES_KEY, []),
)

const requests = ref<LendingRequest[]>(
  readStorage<LendingRequest[]>(REQUESTS_KEY, []),
)

const loans = ref<LendingLoan[]>(
  readStorage<LendingLoan[]>(LOANS_KEY, []),
)

// De expliciete types voorkomen impliciete any-parameters.
watch(
  boxes,
  (value: LendingBox[]) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(BOXES_KEY, JSON.stringify(value))
    }
  },
  { deep: true },
)

watch(
  requests,
  (value: LendingRequest[]) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(value))
    }
  },
  { deep: true },
)

watch(
  loans,
  (value: LendingLoan[]) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOANS_KEY, JSON.stringify(value))
    }
  },
  { deep: true },
)

export function useLending() {
  const activeLoans = computed(() =>
    loans.value.filter(
        (loan: LendingLoan) => loan.returnedDate === null,
    ),
  )

  const returnedLoans = computed(() =>
    loans.value.filter(
        (loan: LendingLoan) => loan.returnedDate !== null,
    ),
  )

  const pendingRequests = computed(() =>
    requests.value.filter(
        (request: LendingRequest) => request.status === 'pending',
    ),
  )

  const availableBoxes = computed(() =>
    boxes.value.filter(
        (box: LendingBox) => box.available && !isBoxOnLoan(box.id),
    ),
  )

  function getBox(boxId: string): LendingBox | undefined {
    return boxes.value.find(
      (box: LendingBox) => box.id === boxId,
    )
  }

  function getLoan(boxId: string): LendingLoan | undefined {
    return activeLoans.value.find(
      (loan: LendingLoan) => loan.boxId === boxId,
    )
  }

  function isBoxOnLoan(boxId: string): boolean {
    return activeLoans.value.some(
      (loan: LendingLoan) => loan.boxId === boxId,
    )
  }

  function isOverdue(loan: LendingLoan): boolean {
    return loan.returnedDate === null && loan.dueDate < today()
  }

  function addBox(data: {
    owner: string
    gameName: string
    condition: BoxCondition
    description: string
  }): LendingBox {
    if (!data.owner.trim() || !data.gameName.trim()) {
      throw new Error('Vul de eigenaar en de naam van het spel in.')
    }

    const box: LendingBox = {
      id: createId(),
      owner: data.owner.trim(),
      gameName: data.gameName.trim(),
      condition: data.condition,
      description: data.description.trim(),
      available: true,
      createdAt: today(),
    }

    boxes.value.push(box)
    return box
  }

  function requestBox(
    boxId: string,
    member: string,
  ): LendingRequest {
    const box = getBox(boxId)

    if (
      !box ||
      !availableBoxes.value.some(
        (item: LendingBox) => item.id === boxId,
      )
    ) {
      throw new Error('Deze spellendoos is niet beschikbaar.')
    }

    if (!member.trim()) {
      throw new Error('Vul je naam in.')
    }

    if (box.owner === member.trim()) {
      throw new Error('Je kunt je eigen spellendoos niet aanvragen.')
    }

    const existing = requests.value.some(
    (request: LendingRequest) =>
        request.boxId === boxId &&
        request.member === member.trim() &&
        request.status === 'pending',
    )

    if (existing) {
      throw new Error('Je hebt al een open aanvraag voor deze doos.')
    }

    const request: LendingRequest = {
      id: createId(),
      boxId,
      member: member.trim(),
      status: 'pending',
      requestedAt: today(),
    }

    requests.value.push(request)
    return request
  }

  // Registreer de start pas wanneer de doos daadwerkelijk is overgedragen.
    function approveRequest(
    requestId: string,
    startDate: string,
    dueDate: string,
    ): LendingLoan {
    const request = requests.value.find(
        (item: LendingRequest) => item.id === requestId,
    )

    if (!request || request.status !== 'pending') {
      throw new Error('Deze aanvraag is niet meer in behandeling.')
    }

    const box = getBox(request.boxId)

    if (!box) {
      throw new Error('De spellendoos bestaat niet meer.')
    }

    if (box.owner === request.member) {
      throw new Error('De eigenaar kan de eigen doos niet lenen.')
    }

    if (isBoxOnLoan(box.id)) {
      throw new Error('Deze spellendoos is al uitgeleend.')
    }

    if (startDate < today()) {
      throw new Error('De startdatum kan niet in het verleden liggen.')
    }

    if (dueDate < startDate) {
      throw new Error('De einddatum moet op of na de startdatum liggen.')
    }

    if (dueDate > addDays(startDate, MAX_LOAN_DAYS)) {
      throw new Error(
        `De uitleenperiode mag maximaal ${MAX_LOAN_DAYS} dagen duren.`,
      )
    }

    const loan: LendingLoan = {
      id: createId(),
      boxId: request.boxId,
      borrower: request.member,
      startDate,
      dueDate,
      extended: false,
      returnedDate: null,
    }

    loans.value.push(loan)
    request.status = 'approved'

    // Andere open aanvragen voor dezelfde doos afwijzen.
    requests.value.forEach((other: LendingRequest) => {
      if (
        other.boxId === request.boxId &&
        other.id !== request.id &&
        other.status === 'pending'
      ) {
        other.status = 'rejected'
      }
    })

    return loan
  }

  function rejectRequest(requestId: string): void {
    const request = requests.value.find(
      item => item.id === requestId,
    )

    if (!request || request.status !== 'pending') {
      throw new Error('Deze aanvraag kan niet worden afgewezen.')
    }

    request.status = 'rejected'
  }

  function cancelRequest(requestId: string, member: string): void {
    const request = requests.value.find(
      item => item.id === requestId,
    )

    if (
      !request ||
      request.status !== 'pending' ||
      request.member !== member
    ) {
      throw new Error('Je kunt deze aanvraag niet annuleren.')
    }

    request.status = 'cancelled'
  }

  function returnLoan(loanId: string): void {
    const loan = loans.value.find(item => item.id === loanId)

    if (!loan || loan.returnedDate !== null) {
      throw new Error('Deze lening is niet actief.')
    }

    loan.returnedDate = today()
  }

  function extendLoan(
    loanId: string,
    borrower: string,
    extraDays = 7,
  ): LendingLoan {
    const loan = loans.value.find(item => item.id === loanId)

    if (!loan || loan.returnedDate !== null) {
      throw new Error('Deze lening is niet actief.')
    }

    if (loan.borrower !== borrower) {
      throw new Error('Alleen de lener kan de lening verlengen.')
    }

    if (loan.extended) {
      throw new Error('Deze lening is al een keer verlengd.')
    }

    if (isOverdue(loan)) {
      throw new Error('Een te late lening kan niet worden verlengd.')
    }

    if (!Number.isInteger(extraDays) || extraDays <= 0) {
      throw new Error('Het aantal extra dagen moet een positief geheel getal zijn.')
    }

    const newDueDate = addDays(loan.dueDate, extraDays)
    const maximumDueDate = addDays(loan.startDate, MAX_LOAN_DAYS)

    if (newDueDate > maximumDueDate) {
      throw new Error(
        `De einddatum mag niet later zijn dan ${maximumDueDate}.`,
      )
    }

    loan.dueDate = newDueDate
    loan.extended = true

    return loan
  }

  return {
    boxes,
    requests,
    loans,
    activeLoans,
    returnedLoans,
    pendingRequests,
    availableBoxes,
    isOverdue,
    getBox,
    getLoan,
    isBoxOnLoan,
    addBox,
    requestBox,
    approveRequest,
    rejectRequest,
    cancelRequest,
    returnLoan,
    extendLoan,
  }
}

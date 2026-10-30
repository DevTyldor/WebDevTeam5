
<script setup lang="ts">
import { ref } from "vue";
import "../../assets/style.css";
import BoxCard from "../../components/lending/BoxCard.vue";

const boxes = [
  {
    name: "Gloomhaven",
    icon: "🏰",
    description: "Een uitgebreid coöperatief avontuur.",
    owner: "Anna",
    condition:
      "Goed — ongeveer 8 jaar gebruikt. Enkele gebruikssporen aan de doos.",
    available: true,
  },
  {
    name: "Terraforming Mars",
    icon: "🚀",
    description: "Werk samen aan de ontwikkeling van Mars.",
    owner: "Bram",
    condition: "Zeer goed. Kaarten zijn gesleeved.",
    available: false,
  },
  {
    name: "Root",
    icon: "🧙",
    description: "Een asymmetrisch strategisch bordspel.",
    owner: "Claire",
    condition: "Goed. Normale gebruikssporen.",
    available: true,
  },
];

type Request = {
  id: number;
  box: string;
  requester: string;
  owner: string;
  status: "Pending" | "Approved" | "Rejected";
};

let nextRequestId = 4;

const requests = ref<Request[]>([
  {
    id: 1,
    box: "Gloomhaven",
    requester: "David",
    owner: "Anna",
    status: "Pending",
  },
  {
    id: 2,
    box: "Terraforming Mars",
    requester: "Eva",
    owner: "Bram",
    status: "Approved",
  },
  {
    id: 3,
    box: "Root",
    requester: "Frank",
    owner: "Claire",
    status: "Rejected",
  },
]);

function requestBox(box: (typeof boxes)[number]) {
  if (!box.available) {
    alert("Dit spel is momenteel uitgeleend.");
    return;
  }

  const alreadyRequested = requests.value.some(
    (request) =>
      request.box === box.name &&
      request.requester === "Jij" &&
      request.status === "Pending"
  );

  if (alreadyRequested) {
    alert("Je hebt dit spel al aangevraagd.");
    return;
  }

  requests.value.push({
    id: nextRequestId++,
    box: box.name,
    requester: "Jij",
    owner: box.owner,
    status: "Pending",
  });

  alert(`Je aanvraag voor ${box.name} is aangemaakt!`);
}

function approveRequest(request: Request) {
  if (request.status !== "Pending") return;

  const box = boxes.find((item) => item.name === request.box);

  if (!box || !box.available) {
    alert("Dit spel is niet meer beschikbaar.");
    return;
  }

  request.status = "Approved";
  box.available = false;

  // Andere openstaande aanvragen voor dezelfde doos afwijzen.
  requests.value.forEach((otherRequest) => {
    if (
      otherRequest.id !== request.id &&
      otherRequest.box === request.box &&
      otherRequest.status === "Pending"
    ) {
      otherRequest.status = "Rejected";
    }
  });

  alert(`De aanvraag voor ${request.box} is goedgekeurd.`);
}

function rejectRequest(request: Request) {
  if (request.status !== "Pending") return;

  request.status = "Rejected";

  alert(`De aanvraag voor ${request.box} is afgewezen.`);
}

const loans = [
  {
    box: "Terraforming Mars",
    borrower: "Eva",
    start: "01-09-2026",
    due: "22-09-2026",
    extended: "Nee",
    returned: "—",
    status: "Lopend",
    statusClass: "loaned",
  },
  {
    box: "Gloomhaven",
    borrower: "David",
    start: "01-08-2026",
    due: "15-09-2026",
    extended: "Ja",
    returned: "—",
    status: "Te laat",
    statusClass: "late",
  },
  {
    box: "Wingspan",
    borrower: "Lisa",
    start: "05-09-2026",
    due: "19-09-2026",
    extended: "Nee",
    returned: "—",
    status: "Lopend",
    statusClass: "loaned",
  },
  {
    box: "Azul",
    borrower: "Tom",
    start: "10-08-2026",
    due: "24-08-2026",
    extended: "Nee",
    returned: "24-08-2026",
    status: "Teruggebracht",
    statusClass: "approved",
  },
];

const rules = [
  {
    title: "Alleen de eigenaar beslist",
    description:
      "Alleen de eigenaar van de betreffende doos kan een aanvraag goedkeuren of afwijzen.",
  },
  {
    title: "Andere aanvragen vervallen",
    description:
      "Na goedkeuring worden andere openstaande aanvragen voor dezelfde doos automatisch afgewezen.",
  },
  {
    title: "Een uitgeleende doos kan niet opnieuw worden uitgeleend",
    description:
      "Een doos kan pas opnieuw worden aangevraagd nadat de lening is beëindigd en de terugkomst is geregistreerd.",
  },
  {
    title: "Terugkomst wordt geregistreerd",
    description:
      "De eigenaar of de commissie registreert wanneer de doos terugkomt.",
  },
  {
    title: "Eén verlenging",
    description:
      "Een lening kan maximaal één keer worden verlengd en alleen zolang deze niet te laat is.",
  },
  {
    title: "Maximale uitleenperiode",
    description:
      "De nieuwe retourdatum moet binnen de maximale uitleenperiode vanaf de startdatum vallen.",
  },
];

const models = [
  {
    icon: "📦",
    name: "Box",
    description:
      "Een fysieke speldoos die door een lid beschikbaar wordt gesteld.",
    fields: [
      ["owner", "Member"],
      ["game", "Game"],
      ["condition", "Text"],
    ],
  },
  {
    icon: "🙋",
    name: "Request",
    description:
      "Een verzoek van een lid om een bepaalde doos te lenen.",
    fields: [
      ["box", "Box"],
      ["member", "Member"],
      ["status", "Pending / Approved / Rejected"],
    ],
  },
  {
    icon: "🤝",
    name: "Loan",
    description:
      "Een actieve of afgeronde uitleenperiode van een doos.",
    fields: [
      ["box", "Box"],
      ["borrower", "Member"],
      ["startDate", "Date"],
      ["returnDate", "Date"],
      ["extended", "Boolean"],
      ["returnedDate", "Date / null"],
    ],
  },
];
</script>

<template>
  <div class="lending-page">
    <header>
      <div class="header-inner">
        <h1>🎲 Game Lending Club</h1>
        <p>Beheer van uitleenbare spellen, aanvragen en leningen.</p>
      </div>
    </header>

    <nav>
      <div class="nav-inner">
        <a href="#dashboard">Dashboard</a>
        <a href="#boxes">Uitleenlijst</a>
        <a href="#requests">Aanvragen</a>
        <a href="#loans">Leningen</a>
        <a href="#rules">Regels</a>
        <a href="#model">Datamodel</a>
      </div>
    </nav>

    <main>
      <section id="dashboard">
        <div class="section-title">
          <div>
            <h2>Dashboard</h2>
            <div class="subtitle">
              Overzicht van de huidige uitleensituatie.
            </div>
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="number">12</div>
            <div class="label">Uitleenbare dozen</div>
          </div>

          <div class="stat">
            <div class="number">
              {{ requests.filter(r => r.status === "Pending").length }}
            </div>
            <div class="label">Openstaande aanvragen</div>
          </div>

          <div class="stat">
            <div class="number">5</div>
            <div class="label">Lopende leningen</div>
          </div>

          <div class="stat">
            <div class="number">1</div>
            <div class="label">Te laat</div>
          </div>
        </div>

        <div class="notice">
          <strong>Let op:</strong>
          de uitleenlijst is niet hetzelfde als de collectie.
          Alleen dozen die daadwerkelijk op de uitleenlijst staan,
          kunnen worden aangevraagd.
        </div>
      </section>

      <section id="boxes">
        <div class="section-title">
          <div>
            <h2>Uitleenlijst</h2>
            <div class="subtitle">
              De fysieke dozen die leden bereid zijn uit te lenen.
            </div>
          </div>
        </div>

        <div class="grid">
          <BoxCard
            v-for="box in boxes"
            :key="box.name"
            :name="box.name"
            :description="box.description"
            :owner="box.owner"
            :condition="box.condition"
            :available="box.available"
            :can-request="box.available"
            @request="requestBox(box)"
          />
        </div>
      </section>

      <section id="requests">
        <div class="section-title">
          <div>
            <h2>Aanvragen</h2>
            <div class="subtitle">
              De eigenaar kan een aanvraag goedkeuren of afwijzen.
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Spel / doos</th>
              <th>Aanvrager</th>
              <th>Eigenaar</th>
              <th>Status</th>
              <th>Acties</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="request in requests"
              :key="request.id"
            >
              <td>{{ request.box }}</td>
              <td>{{ request.requester }}</td>
              <td>{{ request.owner }}</td>

              <td>
                <span
                  class="badge"
                  :class="request.status.toLowerCase()"
                >
                  {{ request.status }}
                </span>
              </td>

              <td>
                <template v-if="request.status === 'Pending'">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="approveRequest(request)"
                  >
                    Goedkeuren
                  </button>

                  <button
                    type="button"
                    class="btn"
                    @click="rejectRequest(request)"
                  >
                    Afwijzen
                  </button>
                </template>

                <span v-else>Beslist</span>
              </td>
            </tr>

            <tr v-if="requests.length === 0">
              <td colspan="5">Er zijn nog geen aanvragen.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="loans">
        <div class="section-title">
          <div>
            <h2>Leningen</h2>
            <div class="subtitle">
              Overzicht van lopende en afgeronde uitleenperiodes.
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Spel / doos</th>
              <th>Lener</th>
              <th>Startdatum</th>
              <th>Retourdatum</th>
              <th>Verlengd</th>
              <th>Teruggebracht</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="loan in loans" :key="loan.box">
              <td>{{ loan.box }}</td>
              <td>{{ loan.borrower }}</td>
              <td>{{ loan.start }}</td>
              <td>{{ loan.due }}</td>
              <td>{{ loan.extended }}</td>
              <td>{{ loan.returned }}</td>
              <td>
                <span class="badge" :class="loan.statusClass">
                  {{ loan.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="rules">
        <div class="section-title">
          <div>
            <h2>Regels</h2>
            <div class="subtitle">
              De belangrijkste bedrijfsregels van het uitleensysteem.
            </div>
          </div>
        </div>

        <div class="rules">
          <div
            v-for="(rule, index) in rules"
            :key="rule.title"
            class="rule"
          >
            <div class="rule-number">{{ index + 1 }}</div>
            <div>
              <strong>{{ rule.title }}</strong>
              <span>{{ rule.description }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="model">
        <div class="section-title">
          <div>
            <h2>Datamodel</h2>
            <div class="subtitle">
              De gegevens die voor ieder onderdeel moeten worden bijgehouden.
            </div>
          </div>
        </div>

        <div class="data-model">
          <div
            v-for="model in models"
            :key="model.name"
            class="card"
          >
            <h3>{{ model.icon }} {{ model.name }}</h3>
            <p>{{ model.description }}</p>

            <ul class="field-list">
              <li
                v-for="field in model.fields"
                :key="field[0]"
              >
                <span class="field-name">{{ field[0] }}</span>
                <span class="field-type">{{ field[1] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer>
      Game Lending Club · Uitleensysteem
    </footer>
  </div>
</template>

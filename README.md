# Gruppe 32 - Prosjekt 2 Dokumentasjon

## Generell diskusjon om løsningen
Vi har laget en web-applikasjon som presenterer informasjon om et gitt GitLab prosjekt. Etter man har skrevet inn prosjekt ID og en tilhørende access token vil man få oversikt over data vi henter ut ved hjelp av GitLab APIet. Man får en tabell med informasjon over prosjektets medlemmer, hvor man kan både filtrere på rolle (f.eks. Developer eller Owner) og sortere enten på rolle eller navn. Man får også se en graf over antall commits per bruker eller antall commits per branch. For commits per branch vil det totale antallet commits, inkludert commits-ene før branchen ble opprettet, vises. 

## Typescript
Ved å bruke Typescript så får man mye bedre oversikt over hver enkelt variabel. Alt blir mye mer rigid, og det blir enklere å unngå bugs relatert til typer, fordi datamaskinen sier fra før de for lov til å oppstå.  

## Responsiv web-design
På innloggingssiden har vi valgt å droppe media-queries, fordi vi kun har et par elementer på siden. Disse er alltid plassert midt på skjermen, og bakgrunnen fyller alltid hele vinduet som er definert som viewport. På viewInfo siden vår brukte vi media-queries ettersom vi har flere elementer som må tilpasse skjermstørrelsen. På en bred skjerm så vil elementene vises ved  siden av hverandre, på en mindre skjerm så vil elementene vises under hverandre. Denne flytende layouten gjør siden lesbar, uansett om man ser den på en større PC skjerm eller på mobil. Avatarene til medlemmene blir skalert fra 35px til 14px når vi går ned til en vindustørrelse under 358px, slik at de ikke tar for stor plass. Grafene egner seg best til å vises på desktop, spesielt ettersom x-aksen sine navn automatisk. Gitt mer tid, ville det vært smart å finne en løsning som gjør navnene lettere å lese på mindre skjermer.

## Funksjonelle komponenter / klasser
Vi har brukt en kombinasjon av funksjonelle komponenter og klasser. Vi valgte å implementere LoginScreen som en funksjonell komponent fordi i denne komponenten ønsket vi å ta i bruk Navigate, noe man ikke kan gjøre like lett i en klasse. Vi valgte derimot å implementere ViewInfo som en klasse, fordi vi da kunne ta i bruk “life cycle methods” som componentDidMount() som vi bruker relatert til våre GitLab API kall. Generelt sett brukte vi ellers funksjonelle komponenter, fordi det er best practice å bruke disse om man kan.

## Chart.js
Vi valgte å bruke en ferdig lagde funksjonelle komponent Bar fra biblioteket react-chartjs-2, istedenfor å designe noe selv. Dette gjorde vi fordi vi regnet det som unødvendig å bruke tid på å lage fra bunnen av. Fokuset hadde vært på CSS og ikke logikk.

## Henting av data - GitLab APIet
Vi har plassert all logikk rundt API-call i en egen fil kalt api.tsx. Vi bruker fetch() som asynkront henter responsen til http forespørselen. Vi har opprettet egen definerte typer som hjelper oss å plukke ut all relevant informasjon fra datasettet. Alle funksjonen returnerer informasjonen i et (nøstet) array. 

På første siden så sjekker vi om brukeren har skrevet inn en gyldig kombinasjon av prosjekt ID og access token ved å se om responsen til forespørselen er mellom 200 - 299 eller utenfor. Hvis denne kombinasjonen er ugyldig, så får brukeren tilbakemelding om det. 

På informasjonssiden (viewInfo.tsx) under metoden componentDidMount så kaller vi på de relevante funksjonene fra api-fila med bruk av then().catch() syntaks. Ergo først etter at vi har mottatt en respons på forespørselen, så kan vi bruke responsen vi fikk videre. ViewInfo er en klassen og vi lagrer arrayene, som api-kallene returnerer, i state-en til klassen.   

Relevant informasjon blir sendt videre til funksjonelle komponenter som props. Disse videre behandler GitLab API-dataen til vi har noe som kan vises på en skjerm. Altså medlemslisten og grafen over commits-data.  

## Lagring av lokal informasjon - HTML Web Storage
Vi bestemte oss for å lagre access token og project id under session storage. Dette valget tok vi fordi det ikke alltid er hensiktsmessig å lagre slik type informasjon over lengre tidsperioder. Videre lagrer vi innstillingene brukeren benytter i medlemslista i local storage. Dette valget tok vi delvis fordi vi ønsket å lagre noe i local storage, men også fordi en bruker kan sette pris på å komme tilbake til siden og ha samme informasjonen vist som da de avsluttet forrige session.

## Context 
Vi har benyttet oss av Context APIet for å bytte mellom dark mode og light mode på informasjonssiden vår. Vi opprettet en fil kalt themeContext.tsx, hvor vi definerte endringene i utseende vi ønsket for disse to alternativene. ViewInfo sin contexttype blir satt til denne, og vi lagrer hvilken alternativ som er aktiv i state-en. Her blir tekst og bakgrunnsfarge endret. Man oppdaterer state-en ved å trykke på “Change theme” knappen. Den funksjonelle komponenten MembersList tar i bruk den samme contexten, og endrer også styling basert på den. 

## Testing
Vi har satt opp testing med Jest. Hoveddelen av testingen vår ligger i filen User.test.tsx. Vi utfører to snapshot tester ved bruk av toMatchSnapshot() funksjonen, som begge tester samme komponent, med to ulike input. Videre tester vi en hjelpefunksjon ved bruk av expect().toBe() og sjekker for forventet return verdi. Her også tester vi to ulike typer input. Hadde vi hatt mer tid satt av til testing, ville vi også laget noen tester som eksplisitt tester verdier som ikke tillates for å sjekke feilmeldingsbehandling. Til slutt tester vi også om vi kan rendere en div uten feil i filen veiwInfo.test.tsx.

## Testing med ulike devices
Vi har test web-applikasjonen i Google Chrome (ver. 105.0.5195.125),  Firefox (ver. 105.0.1) og Microsoft Edge på PC/desktop. Funksjonaliteter som har blitt testet er skalering over forskjellige skjermstørrelser, som har vært viktig i utviklingen. Både Google Chrome og Firefox har hatt utviklerverktøy, hvor vi kunne emulere mindre skjermer som iPhone 7. For disse sjekket vi både for horisontal og vertikal layout. Vi ble generelt fornøyd med layoutet, foruten med navnene på x-aksen til grafen som tidligere nevnt. 

## GitLab
Gruppen har gjennom hele prosjektet benyttet seg av GitLabs system for issues. Disse har vi laget brancher med, og vi har hatt som regel at minst én annen person må se over koden før den eventuelt blir merget. Vi har også vært konsistente på å markere ulike commits til deres tilhørende issues. Vi har assignet ulike issues til gruppemedlemmer, slik at vi har fått bedre kontroll over hvem som arbeider med ulike arbeidsoppgaver, og hvem som eventuelt er arbeidsledige. Vi var litt trege i start med GitLab, ettersom vi startet med mob programmering, så dette er noe vi ser kunne vært et område for forbedring til neste gang.

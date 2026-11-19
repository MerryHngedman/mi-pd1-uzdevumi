# Mani uzdevumi

## Mērķis
Uzdevumu saraksta tīmekļa lietotne, kas darbojas pārlūkā bez servera un interneta savienojuma.

## Faili
- index.html: lapas struktūra, virsraksts un uzdevuma pievienošanas poga, statistika, dialoga forma, saraksts un rīku josla.
- style.css: gaišs pasteļtoņu izskats, responsīvs izkārtojums, kontūru vadīklas, uzdevumu kartītes un pogu stāvokļi.
- skice.jpg: ar roku zīmēta statistikas paneļa skice.
- app.js: visa lietotnes loģika, uzdevumu saglabāšana un attēlošana.
- Statistikas panelī `Kopā`, `Izpildīti`, `Nokavēti` un progresa josla tiek atjaunināti no lietotnes datiem.
- Poga `Pievienot uzdevumu` atver atsevišķu dialogu ar nosaukuma, neobligāta termiņa un prioritātes ievadi.
- Jaunā uzdevuma dialogā prioritāti izvēlas ar radio pogām (`Augsta`, `Vidēja`, `Zema`); sākotnēji atlasīta `Augsta`.
- “Dzēst visus izpildītos” atrodas rīku joslas labajā pusē; filtri un A–Z kārtošana saglabā savu darbību.
- README.md: lietotnes apraksts, palaišanas instrukcija un tehnoloģiju apraksts latviešu valodā.
- uzvednes.md: PD1 uzvedņu un kļūdu nodošanas šablonu dokumentācija.

## Datu struktūra
Tiek izmantota `localStorage` atslēga `pd1-uzdevumi`. Saglabātais dati ir masīvs ar šādiem uzdevuma objektiem:

```json
{
  "id": 1731223200000,
  "text": "Nopirkt pienu",
  "done": false,
  "due": "2026-11-20",
  "priority": "medium"
}
```

`id` ir unikāls skaitlis, `text` ir uzdevuma teksts, `done` norāda, vai uzdevums ir izpildīts, `due` ir neobligāts datuma termiņš formātā `YYYY-MM-DD` vai `null`, bet `priority` ir `high`, `medium` vai `low`. Vecie uzdevumi bez `due` vai `priority` tiek ielādēti ar `null` termiņu un vidēju prioritāti.

## Funkcijas app.js
- loadTasks(): ielādē un pārbauda uzdevumus; trūkstošai vai nederīgai prioritātei piešķir `medium`.
- saveTasks(): saglabā pašreizējo uzdevumu masīvu localStorage.
- generateUniqueId(): izveido un pārbauda unikālu skaitlisku uzdevuma identifikatoru.
- addTask(event): pievieno uzdevumu ar apstrādātu tekstu, izvēlēto termiņu un prioritāti.
- isTaskOverdue(task): nosaka, vai nepabeigtam uzdevumam termiņš ir pagājis.
- formatDueDate(due): pārveido datumu no formāta YYYY-MM-DD uz DD/MM/YYYY.
- appendDueDetails(details, task, overdue): pievieno uzdevuma datumam tā attēlojumu un nokavētā uzdevuma norādi.
- appendPriorityDetails(details, priority): attēlo uzdevuma prioritāti ar krāsu un latvisku teksta apzīmējumu.
- createTaskDetails(task, overdue): izveido uzdevuma tekstu un termiņa informāciju.
- createDeleteButton(task): izveido individuālu uzdevuma dzēšanas pogu.
- toggleTask(event): maina uzdevuma izpildes stāvokli.
- deleteTask(event): dzēš tikai uzdevumu, uz kura dzēšanas pogas klikšķināts.
- deleteCompletedTasks(): dzēš visus izpildītos uzdevumus.
- filterTasks(): atgriež uzdevumus atbilstoši aktīvajam filtram.
- sortTasks(): sakārto uzdevumus latviešu alfabētiskā secībā un saglabā jauno secību.
- createTaskElement(task): izveido vienu uzdevuma HTML elementu.
- renderEmptyState(): attēlo ziņojumu, ja filtrā nav redzamu uzdevumu.
- renderTasks(): notīra sarakstu un attēlo filtrētos uzdevumus.
- renderStats(): aprēķina kopējo, izpildīto un nokavēto uzdevumu skaitu un progresa procentu.
- updateCounter(): aprēķina un attēlo neizpildīto uzdevumu skaitu.
- selectFilter(event): izvēlas filtru un atjaunina pogu vizuālo stāvokli.
- initializeApp(): piesaista notikumu klausītājus un sākotnēji attēlo lietotni.

## Konvencijas
- Tīrs HTML, CSS un JavaScript, bez ārējām bibliotēkām.
- Saskarne, koda komentāri un dokumentācija ir latviski.
- Lietotāja tekstam izsniegšanai izmanto tikai `textContent`.
- JavaScript funkcija nedrīkst būt garāka par 30 rindām.
- Jaunā funkcionalitāte nedrīkst sabojāt PD1 pievienošanas, izpildes, dzēšanas, filtru, skaitītāja un localStorage darbību.

---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
link: /hugo-demo/project1/
image: project1/bus.png
summary: "een samenvatting van het project"
---
naam: "Maikel Reijneke"
opdrachtgever: "Jan"
tags: ["jaar3", "DIT"]                                                              <!-- kies uit één of meer van deze tags: "jaar1", "jaar2", "jaar3", "jaar4", "BM", "PM", "SDE", "DIT", -->

## afbeeldingen
{{< figure src="img/handtekening.jpg" title="handtekening" >}}       <!-- voeg afbeeldingen toe aan de content folder met het formaat: "projecttitel_1", "projecttitel_2" enzovoort. -->

## youtube
{{< youtube QWt8qbVEzLY >}}                                                <!-- vul het gedeelte van de url in wat na "https://www.youtube.com/watch?v=" komt. -->

# beschrijving
"een soort uitgebreide beschrijving van het project met daarin het volledige project proces en de resultaten"
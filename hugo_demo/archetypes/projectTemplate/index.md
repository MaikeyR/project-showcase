---
titel: "{{ replace .Name "-" " " | title }}"            #Dit is de titel van het project
datum: {{ .Date }}
draft: false
link: /hugo-demo/{{ replace .Name "-" " " | title }}/   #Verander de hoofdletter van de projectnaam naar een kleine letter
image: projectnaam/tumbnailnaam.png                     #Dit is de tumbnail van het project
naam: "Je Naam, Namen"                                  #Naam / Namen bijv. "Jan de Lange, Fred Bouwhuis"
opdrachtgever: "naam opdrachtgever"                     #De naam van je opdrachtgever bijv. "Jan de Lange"
thema: "thema naam"                                          #Kies uit Development / UX Design / Business
tags: ["jaar3", "DIT"]                                  #Vul je tags hierin. Het mogen er meerdere zijn. Kies uit (jaar1 / jaar2 / jaar3 / jaar4 / FDD / DB / DT / BM / PM / DIT / etcetera...)
samenvatting: "een samenvatting van het project"        #Korte samenvatting van het project   

#Geef hieronder informatie en uitleg over het project. Dit is geschreven in Markdown (.md) en hier zijn verschillende style-opties. Deze zijn hieronder als voorbeeld weergegeven:
--- 

# Heading level 1 <!-- Dit is de grootste titel--> 
## Heading level 2 <!-- Dit is een kleinere titel dan level 1--> 
### Heading level 3 <!-- Dit is een kleinere titel dan level 2--> 
#### Heading level 4 <!-- Dit is een kleinere titel dan level 3--> 
##### Heading level 5 <!-- Dit is een kleinere titel dan level 4--> 
###### Heading level 6 <!-- Dit is een kleinere titel dan level 5--> 

<!-- Wil je een nieuwe regel beginnen zoals hieronder? Zet dan een aantal spaties (2 of meer) achter het einde van de regel. In het 2e voorbeeld zijn de spaties uitgedrukt met een ster-->
Mijn project ging over een softwarebedrijf.    
Dit was een gave ervaring!    

Mijn project ging over een softwarebedrijf.***    
Dit was een gave ervaring!**

<!-- Wil je je tekst dikgedrukt hebben? Doe dit dan met 2 sterren voor en achter het woord of de regel-->
**Dikgedrukt**
**Deze regel is dikgedrukt**

<!-- Wil je afbeeldingen toevoegen? Doe dat dan op de volgende manier:-->
{{< figure src="projectmapje/projecttitel_1.png" title="tekst onder de afbeelding" >}}       
<!-- voeg afbeeldingen toe aan de content folder met het formaat: "projecttitel_1", "projecttitel_2" enzovoort. -->

<!-- Wil je youtube videos toevoegen? Doe dat dan op de volgende manier:-->
{{< youtube QWt8qbVEzLY >}}                                                
<!-- vul het gedeelte van de url in wat na "https://www.youtube.com/watch?v=" komt. -->

# Website kippenbedrijf
Er was eens een kippenbedrijf dat eieren verkocht. Dit bedrijf vond dat hun website niet meer gebruikersvriendelijk was. Hiervoor hadden ze een oplossing bedacht. Ze informeerde de CHE en liet een aantal studenten hun website verbeteren.   
{{< figure src="projecttitel_1.png" title="Mooie kippen" >}}
**Deze kippen zijn erg mooi**   
Bedankt voor het bekijken van dit project!   


**Let op! Verwijder deze voorbeelden VOORDAT je deze file publiceert**



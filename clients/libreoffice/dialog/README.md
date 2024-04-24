# prompts in llm_dialog.py


```
system_prompts = {
    "resumer": """Agir comme un écrivain. Résumez le texte dans une vue en phrases mettant en évidence les points clés à retenir.""",
    "expliquer": """Agir comme un écrivain. Expliquez le texte en termes simples et concis en gardant le même sens.""",
    "etendre" : """Agir comme un écrivain. Développez le texte en ajoutant plus de détails tout en gardant le même sens.""",
    "formel": """Agir comme un écrivain. Réécrire le texte dans un style plus formel tout en gardant le même sens.""",
    "courant" : """Agir comme un écrivain. Réécrire le texte dans un style plus décontracté tout en gardant le même sens.""",
    "active": """Agir comme un écrivain. Réécrire le texte avec une voix active tout en gardant le même sens.""",
    "liste": """Agir comme un écrivain. Réécrire le texte sous forme de puces tout en gardant le même sens.""",
    "titre": """Agir comme un écrivain.
    Créez un seul titre pour l'ensemble du texte qui donne une bonne compréhension de ce à quoi le lecteur peut s'attendre.
    Le format de ta réponse doit être ## Légende.""",
    "en_fr": """Traduis le texte d'anglais à français.""",
    "fr_en": """Traduis le texte de français à anglais.""",
}

+ " Donne uniquement le texte et rien d'autre, ne discute pas, pas de préambule, va à l'essentiel."
```

# extension Libreoffice
- debuggage de scripts python https://extensions.libreoffice.org/en/extensions/show/apso-alternative-script-organizer-for-python
- python path (Chemin python Libreoffice") https://python-ooo-dev-tools.readthedocs.io/en/main/guide/virtual_env/linux_linking_paths.html#linking-to-libreoffice ou https://extensions.libreoffice.org/en/extensions/show/41996
+ vérifier la mise à jour
- ajouter dans l'extension "Chemin python Libreoffice" le chemin vers les librairies python pour avoir accès aux librairies du système (il peut y en avoir plusieurs)
-- /usr/lib/python3/dist-packages
-- /home/user/.local/lib/python3.10/site-packages



















copy llm_dialog.py to /opt/libreoffice24.2/share/Scripts/python

and import LLMDialog in outils/macros/gérer les boites de dialogue

https://stackoverflow.com/questions/9733638/how-to-post-json-data-with-python-requests

createDialog with handler 
-> https://help.libreoffice.org/latest/en-US/text/sbasic/python/python_handler.html?&DbPAR=SHARED&System=UNIX

opening a dialog with python
https://help.libreoffice.org/latest/en-US/text/sbasic/python/python_dialogs.html?&DbPAR=SHARED&System=UNIX

https://help.libreoffice.org/latest/en-US/text/sbasic/guide/sample_code.html?DbPAR=BASIC

edit dialog language
https://help.libreoffice.org/latest/en-US/text/sbasic/guide/translation.html?&DbPAR=BASIC&System=UNIX

create python scripts (IDE) and scriptforge
https://help.libreoffice.org/latest/en-US/text/sbasic/python/main0000.html?&DbPAR=SHARED&System=UNIX

- https://wiki.documentfoundation.org/Macros/Python_Design_Guide


- python as macro language https://wiki.openoffice.org/wiki/Python_as_a_macro_language
- pyuno https://wiki.openoffice.org/wiki/Python

- scriptforge https://help.libreoffice.org/latest/en-US/text/sbasic/shared/03/sf_intro.html?&DbPAR=SHARED&System=UNIX
- scriptforge library https://help.libreoffice.org/latest/en-US/text/sbasic/shared/03/lib_ScriptForge.html?&DbPAR=SHARED&System=UNIX

- criptforge dialog https://help.libreoffice.org/latest/en-US/text/sbasic/shared/03/sf_dialog.html?&DbPAR=SHARED&System=UNIX

List of Methods in the Dialog Service

Activate
Center
Controls
CloneControl
CreateButton
CreateCheckBox
CreateComboBox
CreateCurrencyField
CreateDateField
CreateFileControl
CreateFixedLine
	

CreateFixedText
CreateFormattedField
CreateGroupBox
CreateHyperlink
CreateImageControl
CreateListBox
CreateNumericField
CreatePatternField
CreateProgressBar
CreateRadioButton
CreateScrollBar
	

CreateTableControl
CreateTextField
CreateTimeField
CreateTreeControl
EndExecute
Execute
GetTextsFromL10N
Resize
OrderTabs
SetPageManager
Terminate

- retriing dialogcontrol instance event
https://help.libreoffice.org/latest/en-US/text/sbasic/shared/03/sf_dialogcontrol.html?&DbPAR=SHARED&System=UNIX


Control types

The DialogControl service is available for these control types:

• Button
• CheckBox
• ComboBox
• CurrencyField
• DateField
• FileControl
	

• FixedLine
• FixedText
• FormattedField
• GroupBox
• Hyperlink
• ImageControl
	

• ListBox
• NumericField
• PatternField
• ProgressBar
• RadioButton
• ScrollBar

- programming with python https://help.libreoffice.org/latest/en-US/text/sbasic/python/python_programming.html?&DbPAR=SHARED&System=UNIX#uno

- python listener , create a dialog https://help.libreoffice.org/latest/en-US/text/sbasic/python/python_listener.html?&DbPAR=SHARED&System=UNIX
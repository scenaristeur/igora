# LibreOffice / OpenOffice


copy http-client.py in ~/.config/libreoffice/4/user/Scripts/python , then open a libreoffice writer doc , type some text, select and run the macro



Télécharger la dernière version (24.2.1)  https://fr.libreoffice.org/download/telecharger-libreoffice/  + pack de langue fr

doc https://wiki.documentfoundation.org/ReleaseNotes/24.2/fr

https://wiki.documentfoundation.org/Macros/Python_Design_Guide/fr

/usr/lib/libreoffice/share/Scripts/python

Extension APSO https://extensions.libreoffice.org/en/extensions/show/apso-alternative-script-organizer-for-python

ou EasyDev https://easydev.readthedocs.io/fr/latest/

macro en python https://wiki.documentfoundation.org/Macros/Python_Design_Guide/fr

$HOME/.config/libreoffice/4/user/Scripts/python

https://help.libreoffice.org/latest/en-US/text/sbasic/python/python_examples.html?&DbPAR=SHARED&System=UNIX

ne trouve pas requests

/opt/libreoffice24.2/program$ sudo ln -s ~/.local/lib/python3.10/site-packages/requests .

ou importer https://help.libreoffice.org/latest/fr/text/sbasic/python/python_import.html

macro in doc and autres astuces https://christopher5106.github.io/office/2015/12/06/openoffice-libreoffice-automate-your-office-tasks-with-python-macros.html

https://gist.github.com/thekalinga/b74056272cb1afdabf529a332ff0f517

pyuno & socket [localhost:2002](http://localhost:2002) https://www.linuxjournal.com/content/starting-stopping-and-connecting-openoffice-python

import any module https://thebiasplanet.blogspot.com/2020/10/importinganymoduleintoyourlibreofficepythonmacromodulepart1.html

sauvage copie des site packages MAIS FONCTIONNE !

/opt/libreoffice24.2/program/python-core-3.8.18/lib$ sudo ln -s ~/.local/lib/python3.10/site-packages .


# more options
 - see README.md in clients/libreoffice/24.2.1/llm 
 - https://help.libreoffice.org/latest/ro/text/sbasic/python/python_dialogs.html

 # basic
 - https://help.libreoffice.org/latest/fr/text/sbasic/shared/01020100.html?&DbPAR=BASIC&System=UNIX
# -*- coding: utf-8 -*-

# store this file in ~/.config/libreoffice/4/user/Scripts/python/AskLlm.py
# Then open a LibroOffice document, select text, and 
# go to Outils/Macro/Executer la Macro
# Choisir Mes Macros / AskLlm.py
# Le texte est envoyé au serveur distant
# import python modules https://help.libreoffice.org/latest/fr/text/sbasic/python/python_import.html
from __future__ import unicode_literals

import sys, uno

sys.path.insert(0, "~/.local/lib/python3.10/site-packages/")

import requests
# from openai import OpenAI

print(sys.path)

def OnDocPostOpenLoadPython():
    """ Prepare l'import des modules Python pendant que le doc. charge """
   # PythonLibraries.loadLibrary('lib/subdir')  # Ajoute le dossier au chemin de recherche
    PythonLibraries.loadLibrary('~/.local/lib/python3.10/site-packages/')
    #PythonLibraries.loadLibrary('requests', 'screen_io')  #Ajoute le répertoire  & importe screen_io
    #PythonLibraries.loadLibrary('~/.local/lib/python3.10/site-packages/requests', 'requests') 

# -*- coding: utf-8 -*-
#from __future__ import unicode_literals


# user_lib = Session().UserPythonScripts  # emplacement des scripts utilisateur
# if not user_lib in sys.path:
#sys.path.insert(0, user_lib)  # Ajouter au chemin de recherche

# import screen_io as ui  # le module 'screen_io.py' module réside dans le répertoire user_lib
# # Votre code suit ici

def OnDocQueryCloseUnloadPython():
    """ Nettoie PYTHON_PATH quand doc.fermé """
    PythonLibraries.unloadLibrary('requests')  # Python runtime path cleanup
    # Note: les modules importés restent chargés dans cet exemple

class PythonLibraries():
    """ chargeur de bibliothèque Python et importation de modules

    adapté depuis'Bibliothèque de fonctions' parHubert Lambert
    à https://forum.openoffice.org/fr/forum/viewtopic.php?p=286213 """
    def isImportedModule(module_name: str) -> bool:
        """ Check run time module list """
        return (module_name in sys.modules.keys())
    def isLoadedLibrary(lib_name: str) -> bool:
        """ Vérifie le contenu de PYTHON_PATH """
        return (lib_name in sys.path)
    def loadLibrary(lib_name: str, module_name=None):
        """ ajoute le répertoire à  PYTHON_PATH, importe le module nommé"""
        doc = XSCRIPTCONTEXT.getDocument()
        url = uno.fileUrlToSystemPath('{}/{}'.format(doc.URL,'Scripts/python/'+lib_name))
        if not url in sys.path:
            sys.path.insert(0, url)
        if module_name and not module_name in sys.modules.keys():
            return zipimport.zipimporter(url).load_module(module_name)
    def unloadLibrary(lib_name: str):
        """supprime le répertoire de PYTHON_PATH """
        sys.path.remove(lib_name)

def getNewString1(theString):
    """helper function
    """
    if (not theString):
        return ""

    # should we tokenize on "."?
    if len(theString) >= 2 and theString[:2].isupper():
        # first two chars are UC => first UC, rest LC
        newString = theString[0].upper() + theString[1:].lower()

    elif theString[0].isupper():
        # first char UC => all to LC
        newString = theString.lower()

    else:
        # all to UC.
        newString = theString.upper()

    return newString


def send_text_to_server1(text):


    client = OpenAI(base_url="http://127.0.0.1:5678/v1", api_key="sk-xxx")
    response = client.chat.completions.create(
        model="ehartford_dolphin-2.2.1-mistral-7b",
              messages = [
          {"role": "system", "content": "You are an assistant who perfectly describes images."},
          {
              "role": "user",
              "content": "Describe this image in detail please."
          }
      ]

        # messages=[
        #     {
        #         "role": "user",
        #         "content": [
        #             {
        #                 "type": "image_url",
        #                 "image_url": {
        #                     "url": "<image_url>"
        #                 },
        #             },
        #             {"type": "text", "text": "What does the image say"},
        #         ],
        #     }
        # ],
    )
    print(response)
    return response


def send_text_to_server(text):
    url = "http://127.0.0.1:5678/v1/chat/completions"
    #payload = {"text": text}
    #payload ={"messages":[{"role":"system","content":"Tu es un pirate et tu commences toutes tes phrases par 'Hé! Hé! Hé!'."},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"stream":false,"max_tokens":800,"stop":["###"]}
    payload ={"messages":[{"role":"system","content":"Tu es un pirate et tu commences toutes tes phrases par 'Hé! Hé! Hé!'."},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"max_tokens":800,"stop":["###"]}




    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Text successfully sent to the server.")
            return response
        else:
            print("Error: Server returned status code", response.status_code)
            return response
    except Exception as e:
        print("An error occurred while sending text to the server:", str(e))
        return e


def askLlm():
    """Change the case of the selected or current word(s).
    If at least the first two characters are "UPpercase, then it is changed
    to first char "Uppercase".
    If the first character is "Uppercase", then it is changed to
    all "lowercase".
    Otherwise, all are changed to "UPPERCASE".
    """
    # The context variable is of type XScriptContext and is available to
    # all BeanShell scripts executed by the Script Framework
    xModel = XSCRIPTCONTEXT.getDocument()

    # the writer controller impl supports the css.view.XSelectionSupplier
    # interface
    xSelectionSupplier = xModel.getCurrentController()

    # see section 7.5.1 of developers' guide
    xIndexAccess = xSelectionSupplier.getSelection()
    count = xIndexAccess.getCount()

    if(count >= 1):  # ie we have a selection
        i = 0

    while i < count:
        xTextRange = xIndexAccess.getByIndex(i)
        theString = xTextRange.getString()
        # print("theString")
        if len(theString) == 0:
            # sadly we can have a selection where nothing is selected
            # in this case we get the XWordCursor and make a selection!
            xText = xTextRange.getText()
            xWordCursor = xText.createTextCursorByRange(xTextRange)

            if not xWordCursor.isStartOfWord():
                xWordCursor.gotoStartOfWord(False)

            xWordCursor.gotoNextWord(True)
            theString = xWordCursor.getString()
            newString = send_text_to_server(theString)

            if newString:
                xWordCursor.setString(newString)
                xSelectionSupplier.select(xWordCursor)
        else:
            newString = send_text_to_server(theString)
            if newString:
                xTextRange.setString(newString)
                xSelectionSupplier.select(xTextRange)
        i += 1


# lists the scripts, that shall be visible inside OOo. Can be omitted, if
# all functions shall be visible, however here getNewString shall be suppressed
g_exportedScripts = askLlm,

# vim: set shiftwidth=4 softtabstop=4 expandtab:

# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os

import requests
# def consoleDlg():
#     ctx =XSCRIPTCONTEXT.getComponentContext()
#     smgr = ctx.getServiceManager()
#     dp = smgr.createInstanceWithContext("com.sun.star.awt.DialogProvider", ctx)
#     dlg = dp.createDialog( "vnd.sun.star.script:Access2Base.dlgTrace?location=application")
#     dlg.execute()
#     dlg.dispose()
# from dotenv import load_dotenv
# load_dotenv()
# SERVER = os.environ.get("SERVER")
# PORT = os.environ.get("PORT")
SERVER="127.0.0.1"
PORT="5678"

# os.environ['NO_PROXY'] = '127.0.0.1,localhost,SERVER'
# SSL=os.getenv("SSL", 'False').lower() in ('true', '1', 't')
# PROTOCOL= 'https' if SSL else 'http'
# url = f"{PROTOCOL}://{SERVER}:{PORT}/v1/chat/completions"
url = f"http://{SERVER}:{PORT}/v1/chat/completions"

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


def llmDialog(event=None):
    ctx = XSCRIPTCONTEXT.getComponentContext()
    smgr = ctx.getServiceManager()
    dp = smgr.createInstanceWithContext("com.sun.star.awt.DialogProvider", ctx)
    dlg = dp.createDialog(
        "vnd.sun.star.script:Standard.LlmDialogChoice?location=application")
    dlg.execute()
    dlg.dispose()




def send_text_to_server(system_prompt,text):

   
    #payload = {"text": text}
    #payload ={"messages":[{"role":"system","content":"Tu es un pirate et tu commences toutes tes phrases par 'Hé! Hé! Hé!'."},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"stream":false,"max_tokens":800,"stop":["###"]}
    payload ={"messages":[{"role":"system","content":system_prompt},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"max_tokens":800,"stop":["###"]}

    print("\npayload", payload)


   # try:
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        resp_json = response.json()
        print("\nText successfully sent to the server.\Response:", resp_json)
        content = resp_json['choices'][0]['message']['content']
        print("\nContent",content)
        return content
    else:
        resp_json = response.json()
        print("Error: Server returned status code", response.status_code, resp_json)
        return response
   # except Exception as e:
    #    print("An error occurred while sending text to the server:", str(e))
    #    return e
   
def GetPrompt(e):
    """Inserts the argument string into the current document.
    If there is a selection, the selection is replaced by it.
    """
    
    action = e.Source.Model.Name
    print("\naction",action)
    system_prompt = system_prompts[action]+" Donne uniquement le texte et rien d'autre, ne discute pas, pas de préambule, va à l'essentiel."
    print(system_prompt)
    

    # Get the doc from the scripting context which is made available to
    # all scripts.
    desktop = XSCRIPTCONTEXT.getDesktop()
    model = desktop.getCurrentComponent()

    # Check whether there's already an opened document.
    if not hasattr(model, "Text"):
        return

    # The context variable is of type XScriptContext and is available to
    # all BeanShell scripts executed by the Script Framework
    xModel = XSCRIPTCONTEXT.getDocument()

    # The writer controller impl supports the css.view.XSelectionSupplier
    # interface.
    xSelectionSupplier = xModel.getCurrentController()

    # See section 7.5.1 of developers' guide
    xIndexAccess = xSelectionSupplier.getSelection()
    count = xIndexAccess.getCount()

    if count >= 1:  # ie we have a selection
        i = 0

    while i < count:
        xTextRange = xIndexAccess.getByIndex(i)
        theString = xTextRange.getString()
        newString = send_text_to_server(system_prompt,theString)
        
        print("\nnewString",newString)

        if not len(theString):
            # Nothing really selected, just insert.
            xText = xTextRange.getText()
            xWordCursor = xText.createTextCursorByRange(xTextRange)
            xWordCursor.setString(newString)
            xSelectionSupplier.select(xWordCursor)
        else:
            # Replace the selection.
            xTextRange.setString(newString)
            xSelectionSupplier.select(xTextRange)

        i += 1

# def InsertHello(event=None):
#     # Calls the InsertText function to insert the "Hello" string
#     InsertText("Hello")

# Make InsertHello visible by the Macro Selector

g_exportedScripts = (
    llmDialog,
    # InsertHello,
    GetPrompt
    # consoleDlg, tutorDialog, docDialog
)

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# def consoleDlg():
#     ctx =XSCRIPTCONTEXT.getComponentContext()
#     smgr = ctx.getServiceManager()
#     dp = smgr.createInstanceWithContext("com.sun.star.awt.DialogProvider", ctx)
#     dlg = dp.createDialog( "vnd.sun.star.script:Access2Base.dlgTrace?location=application")
#     dlg.execute()
#     dlg.dispose()


def llmDialog(event=None):
    ctx = XSCRIPTCONTEXT.getComponentContext()
    smgr = ctx.getServiceManager()
    dp = smgr.createInstanceWithContext("com.sun.star.awt.DialogProvider", ctx)
    dlg = dp.createDialog(
        "vnd.sun.star.script:Standard.Dialog1?location=application")
    dlg.execute()
    dlg.dispose()

def send_text_to_server(text):
    url = "http://127.0.0.1:5678/v1/chat/completions"
    #payload = {"text": text}
    #payload ={"messages":[{"role":"system","content":"Tu es un pirate et tu commences toutes tes phrases par 'Hé! Hé! Hé!'."},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"stream":false,"max_tokens":800,"stop":["###"]}
    payload ={"messages":[{"role":"system","content":"Tu es un pirate et tu commences toutes tes phrases par 'Hé! Hé! Hé!'."},{"role":"user","content":text}],"model":"gpt-3.5-turbo","temperature":0,"max_tokens":800,"stop":["###"]}




    try:
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("Text successfully sent to the server.")
            return response
        else:
            print("Error: Server returned status code", response.status_code)
            return response
    except Exception as e:
        print("An error occurred while sending text to the server:", str(e))
        return e
   
def InsertText(text):
    """Inserts the argument string into the current document.
    If there is a selection, the selection is replaced by it.
    """

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
        newString = send_text_to_server(theString)

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

def InsertHello(event=None):
    # Calls the InsertText function to insert the "Hello" string
    InsertText("Hello")

# Make InsertHello visible by the Macro Selector

g_exportedScripts = (
    llmDialog,
    InsertHello,
    # consoleDlg, tutorDialog, docDialog
)

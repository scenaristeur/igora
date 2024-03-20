from __future__ import annotations
from ooodev.loader import Lo
from ooodev.write import WriteDoc
from ooodev.dialog.input import Input
# https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html
from ooodev.dialog import Dialog
from my_mod.llm_config_d import LlmConfigD
import http.client
import json


config = {
    "url": "127.0.0.1:5678",
    "actions": [
    {"name": "Etendre", "systemPrompt": "Agis comme un écrivain. Développe le texte suivant en ajoutant plus de détails, tout en gardant le même sens. Sors uniquement le texte et rien d'autre. Ne discute pas, pas de préambule, va à l'essentiel."},
    {"name": "Résumer", "systemPrompt": "Tu es un écrivain"}
    ]}

systemPrompt = config["actions"][0]["systemPrompt"]


def say_hello(*args):
    doc = Lo.current_doc
    doc.msgbox("Hello, world!")


def ecrire_salut(arg1 = None):
    print("wwhat is arg1",arg1)
    doc = WriteDoc.from_current_doc()
    cursor = doc.get_cursor()
    cursor.append_para(text="Salut")


def input_system_prompt():
    ps = Input.get_input(title="System Prompt", msg="System prompt")
    doc = WriteDoc.from_current_doc()
    cursor = doc.get_cursor()
    cursor.append_para(text=ps)


def config_dialog():
    # https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html
    dialog = Dialog(title="Config", x=100, y=100, width=300, height=400)
    # dialog.insert_button("OK", 10,10,60, height=20, btn_type=None, name='valid')
    dialog.insert_text_field(text="Text", x=10, y=10, width=60, height=20)

    ok_btn = dialog.insert_button(label="OK", x=10, y=300, width=50, name='ok')
    ok_btn.add_event_mouse_released(lambda event: ecrire_salut())
    # dialog.execute() # https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html#ooodev.dialog.Dialog.execute
    dialog.set_visible(True)
    dialog.execute()
    dialog.dispose()
    dialog.set_visible(False)
    # dialog.to_front()


def llm_config(arg1 = None):
    global systemPrompt
    print("wwhat is arg1 with icon in toolbar",arg1)
    dialog = LlmConfigD(config)
    #state = dialog.get_text()
    # llmcd = LlmConfigDialog() # TODO : import radio_group_box.py
    # state =llmcd.getState()
    # #llmcd.show()
    # # # llmcd.set_truc("machin")
    # # state =llmcd.get_truc()

    # #llmcd.dispose()

    doc = WriteDoc.from_current_doc()
    cursor = doc.get_cursor()
    #cursor.append_para(text=state)
    #dialog.set_text("Vegetables")
    #state = dialog.get_text()
    #cursor.append_para(text=state)
    #dialog.set_config(config)
    #state = dialog.get_config()
    #cursor.append_para(text=state["actions"][0]["systemPrompt"])


    dialog.show()
    systemPrompt = dialog.get_text()
    #cursor.append_para(text=state)
    dialog.dispose()





def getNewString(theString):
    """helper function
    """
    global systemPrompt
    if (not theString):
        return ""

    # # should we tokenize on "."?
    # if len(theString) >= 2 and theString[:2].isupper():
    #     # first two chars are UC => first UC, rest LC
    #     newString = theString[0].upper() + theString[1:].lower()

    # elif theString[0].isupper():
    #     # first char UC => all to LC
    #     newString = theString.lower()

    # else:
    #     # all to UC.
    #     newString = theString.upper()

    host = "127.0.0.1:5678"
    headers = {'Content-type': 'application/json'}
    conn = http.client.HTTPConnection(host)
    # conn = http.client.HTTPSConnection()

    # foo = {'text': 'Hello HTTP #1 **cool**, and #1!'}
    data = {'model': "ehartford_dolphin-2.2.1-mistral-7b",
            'messages': [{"role": "system",
                          "content": systemPrompt},
                         {
                "role": "user",
                "content": theString
            }
            ]
            }
    json_data = json.dumps(data)

    conn.request("POST", "/v1/chat/completions"  # , headers={"Host": host}
                 , json_data, headers
                 )

    response = conn.getresponse()

    print(response.status, response.reason)
    result_str = response.read().decode()
    print(result_str)
    #newString = response.status + " " + response.reason
    # conn = http.client.HTTPSConnection('www.httpbin.org')

    # headers = {'Content-type': 'application/json'}

    # foo = {'text': 'Hello HTTP #1 **cool**, and #1!'}
    # json_data = json.dumps(foo)

    # conn.request('POST', '/post', json_data, headers)

    # response = conn.getresponse()
    # print(response.read().decode())
    print(type(result_str))
    result = json.loads(result_str)
    print(type(result))
    print("result",result)
    print("choices",result["choices"])
    print("zero",result["choices"][0])
    print("message",result["choices"][0]["message"])
    print("content",result["choices"][0]["message"]["content"])
    newString=result["choices"][0]["message"]["content"]
    print("new string",newString)

    return newString


def llmHttpClient(arg1 = None):
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

    print("wwhat is arg1",arg1)


    # the writer controller impl supports the css.view.XSelectionSupplier
    # interface
    xSelectionSupplier = xModel.getCurrentController()

    # see section 7.5.1 of developers' guide
    xIndexAccess = xSelectionSupplier.getSelection()
    count = xIndexAccess.getCount()

    if (count >= 1):  # ie we have a selection
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
            newString = getNewString(theString)

            if newString:
                xWordCursor.setString(newString)
                xSelectionSupplier.select(xWordCursor)
        else:
            newString = getNewString(theString)
            if newString:
                xTextRange.setString(newString)
                xSelectionSupplier.select(xTextRange)
        i += 1



def print_config_DOESNOTWORK():
    doc = WriteDoc.from_current_doc()
    cursor = doc.get_cursor()
    cursor.append_para(text="Salut")
    with Lo.Loader(Lo.ConnectSocket(headless=True)) as loader:
        print(f"OS Platform: {platform.platform()}")
        print(f"OS Version: {platform.version()}")
        print(f"OS Release: {platform.release()}")
        print(f"OS Architecture: {platform.architecture()}")

        print(f"\nOffice Name: {Info.get_config('ooName')}")
        print(
            f"\nOffice version (long): {Info.get_config('ooSetupVersionAboutBox')}")
        print(f"Office version (short): {Info.get_config('ooSetupVersion')}")
        print(f"\nOffice language location: {Info.get_config('ooLocale')}")
        print(
            f"System language location: {Info.get_config('ooSetupSystemLocale')}")

        print(f"\nWorking Dir: {Info.get_paths('Work')}")
        print(f"\nOffice Dir: {Info.get_office_dir()}")
        print(f"\nAddin Dir: {Info.get_paths('Addin')}")
        print(f"\nFilters Dir: {Info.get_paths('Filter')}")
        print(f"\nTemplates Dirs: {Info.get_paths('Template')}")
        print(f"\nGallery Dir: {Info.get_paths('Gallery')}")


g_exportedScripts = (say_hello, ecrire_salut,
                    #input_system_prompt, config_dialog,
                       llm_config, llmHttpClient)

from __future__ import annotations
from ooodev.loader import Lo
from ooodev.write import WriteDoc
from ooodev.dialog.input import Input
# https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html
from ooodev.dialog import Dialog
from my_mod.llm_config_d import LlmConfigD



config = {"actions": [
    {"name": "Etendre", "systemPrompt": "Agis comme un écrivain. Développe le texte suivant en ajoutant plus de détails, tout en gardant le même sens. Sors uniquement le texte et rien d'autre. Ne discute pas, pas de préambule, va à l'essentiel."},
    {"name": "Résumer", "systemPrompt": "Tu es un écrivain"}
    ]}


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
    print("wwhat is arg1 with icon in toolbar",arg1)
    dialog = LlmConfigD("Fruits", "JetBrains Mono NL", config)
    state = dialog.get_text()
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
    state = dialog.get_text()
    cursor.append_para(text=state)
    dialog.dispose()





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
                     input_system_prompt, config_dialog, llm_config)

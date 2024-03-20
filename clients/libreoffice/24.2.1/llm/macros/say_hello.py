from __future__ import annotations
from ooodev.loader import Lo
from ooodev.write import WriteDoc
from ooodev.dialog.input import Input
from ooodev.dialog import Dialog # https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html
from my_mod.radio_group_box import RadioGroupBox



def say_hello(*args):
    doc = Lo.current_doc
    doc.msgbox("Hello, world!")

def ecrire_salut():
    doc = WriteDoc.from_current_doc()    
    cursor = doc.get_cursor()
    cursor.append_para(text="Salut")


def input_system_prompt():
    ps = Input.get_input(title="System Prompt", msg="System prompt")
    doc = WriteDoc.from_current_doc()    
    cursor = doc.get_cursor()
    cursor.append_para(text=ps)

def config_dialog():
    #https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html
    dialog = Dialog(title="Config", x=100, y=100, width=300, height=400)
    #dialog.insert_button("OK", 10,10,60, height=20, btn_type=None, name='valid')
    dialog.insert_text_field(text="Text", x=10,y=10,width=60, height=20)




    ok_btn=dialog.insert_button(label="OK", x=10,y=300, width=50, name='ok')
    ok_btn.add_event_mouse_released(lambda event: ecrire_salut())
    #dialog.execute() # https://python-ooo-dev-tools.readthedocs.io/en/main/src/dialog/dialog.html#ooodev.dialog.Dialog.execute
    dialog.set_visible(True)
    dialog.execute()
    dialog.dispose()
    dialog.set_visible(False)
    #dialog.to_front()

def radio():
    rg = RadioGroupBox() # TODO : import radio_group_box.py
    rg.show()


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
        print(f"\nOffice version (long): {Info.get_config('ooSetupVersionAboutBox')}")
        print(f"Office version (short): {Info.get_config('ooSetupVersion')}")
        print(f"\nOffice language location: {Info.get_config('ooLocale')}")
        print(f"System language location: {Info.get_config('ooSetupSystemLocale')}")

        print(f"\nWorking Dir: {Info.get_paths('Work')}")
        print(f"\nOffice Dir: {Info.get_office_dir()}")
        print(f"\nAddin Dir: {Info.get_paths('Addin')}")
        print(f"\nFilters Dir: {Info.get_paths('Filter')}")
        print(f"\nTemplates Dirs: {Info.get_paths('Template')}")
        print(f"\nGallery Dir: {Info.get_paths('Gallery')}")

g_exportedScripts = (say_hello, ecrire_salut, input_system_prompt, config_dialog, radio)
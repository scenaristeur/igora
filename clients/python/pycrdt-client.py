import asyncio
# import y_py as Y
from pycrdt import Doc, Map
from websockets import connect
from ypy_websocket import WebsocketProvider

async def client():
    # ydoc = Y.YDoc()
    ydoc = Doc()
    async with (
        connect("ws://localhost:1234/market") as websocket,
        WebsocketProvider(ydoc, websocket),
    ):
        def callback(e):
            print("event",e)
            print("\n-----------")
            print("TODOS",todos)
            print("DOING",doing)
            print("DONE",done)
            #print("\nKEYS",todos.keys())
            #print("\nEVENTS",e.keys)
            # for id , task in todos.items():
            #     print("------1 todo",id, "->", task)
            #     try:
            #         ydoc.transact(lambda txn: todos.pop(txn, id))
            #         ydoc.transact(lambda txn: doing.set(txn, id, task))
            #     except Exception as e:
            #         print("ERROR", e)

        # todos = ydoc.get_map("todos")
        # doing = ydoc.get_map("doing")
        # done = ydoc.get_map("done")
        
        todos = ydoc["todos"]
        doing = ydoc["doing"]
        done = ydoc["done"]

        todos.observe(callback)
        doing.observe(callback)
        done.observe(callback)

        await asyncio.Future()  # run forever

asyncio.run(client())
#!/usr/bin/env python

import struct
import asyncio
import threading

from websockets import serve

connections = []

async def echo(websocket):
    print('New connection')

    global connections
    connections.append(websocket)
    
    async for message in websocket:
        print(message)
        await asyncio.gather(*[c.send(message) for c in connections])

    connections.remove(websocket)
    print('Connection ended')

async def main():
    async with serve(echo, "localhost", 8000):
        await asyncio.Future()  # run forever

asyncio.run(main())

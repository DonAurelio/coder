#!.env/bin/python3

import psutil 
import sys
import time

if len(sys.argv) > 1:
    print("Start monitoring....")
    seconds = int(sys.argv[1])
    with open('log.txt','w') as file:
        while seconds > 0:
            time.sleep(1)
            cpu = psutil.cpu_percent()
            mem = psutil.virtual_memory()
            file.write('{};{}\n'.format(cpu,mem.percent))
            seconds -= 1
else:
    print('Please specifiy the seconds')

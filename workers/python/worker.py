import sys

arg1 =  sys.argv[1]
arg2 = sys.argv[2]

dataToSendBack = "it works !"+arg1+" "+arg2

print(dataToSendBack)
sys.stdout.flush()
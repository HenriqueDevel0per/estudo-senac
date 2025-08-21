idade = 0 
adulto = 0

for i in range(4):
    pessoa = input("\n\n\Insira a sua seu nome : ")
    idade = int(input(f"\n\n\insira a idade de {pessoa} :"))
    if idade >= 18:
        adulto = adulto + 1 
    else:
        ()

 

print(f"\n\no total de pessoas mais velhas é {adulto}")
sumid = 0

for i in range(5):
    nome = str(input("\n\nDigite o nome do amigo : "))
    idade = int(input(f"\n\nInsira a idade {nome}: "))
    sumid += idade
    
print(f"\n\nA soma das idades dos amigos é : {sumid}")
n1 = int(input("Digite um número inteiro: ")) 
n2 = int(input("Digite outro número inteiro: "))

x1 = 0
x2 = 0 

# Faça o teste de mesa duas vezes. 
# Na primeira vez, os números digitados foram 1 e 2 
# Na segunda vez, os números digitados foram 10 e 7 
 
for z in range(4): 
    x1 = n1 * z 
    if x1 > 15: 
        print("\nO primeiro número ultrapassou 15")

    x2 = n2 - z  
    if x2 < 0: 
        print("\nO segundo número ficou negativo")
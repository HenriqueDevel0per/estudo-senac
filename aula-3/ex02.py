entrada = input("Insira os numeros separados por virgula (1,2,3,4...):")

lista = [int(x.strip()) for x in entrada.split(",")]

for x in lista:
    print(x)
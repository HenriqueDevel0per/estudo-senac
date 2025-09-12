totcas = 0
totsolt = 0
contador = "S"

print("\n\n\n")

while contador == "S":
    nome = input("\n\nInsira seu nome: ")
    estcivil = input(f"\n\n{nome} Insira seu Estado Civil / S - Solteiro / C - Casado: ").upper()
    if estcivil == "C":
        totcas += 1
    else:
        totsolt += 1
    contador = input("\n\nDeseja continuar contabilizando? S / N : ").upper()

print(f"\n\nTotal Solteiros :{totsolt}\n Total Casados :{totcas} ")
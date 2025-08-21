time = 0 
bota = 0
fla = 0
vasc = 0
flu = 0

print("\n\n\n Escolha seu time do coração")

for i in range(4):
    time = (input(f"\n\n 1 = Flamengo  2 - Vasco  3 - Fluminense  4 - Botafogo:"))
    match time:
        case "1":
            fla += 1
        case "2":
            vasc += 1
        case "3":
            flu += 1
        case "4":
            bota += 1
        case _:
            print("Opção invalida")


print(f"\n\ntotal torcedores Flamengo {fla} \ntotal torcedores Vasco {vasc} \n Total torcedores Fluminense {flu} \n total torcedores botafogo {bota}")
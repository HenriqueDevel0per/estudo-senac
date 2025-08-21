totcsd = 0
totsolt = 0

for i in range(4):
    colab = str(input("\n\nDigite o nome do colaborador : ")) 
    estcvl =input(f"\n\n O colaborador é solteiro ou casado : C - Casado \ S - Solteiro ").upper()
    if estcvl == "S":
        totsolt = totsolt + 1
    else:
        totcsd = totcsd + 1

print(f"O total de solteiros é {totsolt} e total de casados é {totcsd}")
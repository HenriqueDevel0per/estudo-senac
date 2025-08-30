salarios = []   # lista vazia

# 1) Coletar salários no vetor
for i in range(3):
    salario = float(input(f"Digite o {i+1}º salário: "))
    salarios.append(salario)

# 2) Função que calcula a média
def media(lista):
    print("📥 Recebi dentro da função:", lista)  # só pra mostrar
    return sum(lista) / len(lista)

# 3) Chamar a função e passar o vetor
print("Média dos salários:", media(salarios))
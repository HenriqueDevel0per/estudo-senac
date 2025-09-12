# Lista para guardar os salários
salarios = []

# Coleta de 5 salários
for i in range(5):
    salario = float(input(f"Digite o {i+1}º salário: "))
    salarios.append(salario)

# Função que calcula a média
def media(parametro):
    return sum(parametro) / len(parametro)

# Mostra todos os salários
print("Salários digitados:")
for s in salarios:
    print(s)

# Calcula e mostra a média
print("Média dos salários:", media(salarios))
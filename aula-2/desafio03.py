# Pergunta quantas vezes o cálculo deve ser repetido
num_pessoas = int(input("Quantos cálculos de IMC você deseja realizar? "))

for i in range(num_pessoas):
    print(f"\n--- Inserindo dados para a Pessoa {i + 1} de {num_pessoas} ---")

    nome = input("Digite o nome da pessoa: ")
    idade = int(input("Digite a idade: "))
    peso = float(input("Digite o peso (em kg, ex: 70.5): "))
    altura = float(input("Digite a altura (em metros, ex: 1.75): "))

    # --- Cálculo do IMC ---
    imc = peso / (altura * 2)

    # --- Classificação do IMC ---
    classificacao = ""
    if imc < 18.5:
        classificacao = "Abaixo do peso"
    elif imc < 25:
        classificacao = "Peso ideal (Parabéns!)"
    elif imc < 30:
        classificacao = "Levemente acima do peso"
    elif imc < 35:
        classificacao = "Obesidade Grau I"
    elif imc < 40:
        classificacao = "Obesidade Grau II (Severa)"
    else:
        classificacao = "Obesidade Grau III (Mórbida)"

    # --- Exibição dos Dados ---
    print("\n---------- Resultado do IMC ----------\n")
    print(f"Nome: {nome}")
    print(f"Idade: {idade} anos")
    print(f"Peso: {peso:.2f} kg")
    print(f"Altura: {altura:.2f} m")
    print(f"IMC Calculado: {imc:.2f}")
    print(f"Classificação: {classificacao}\n")
    print("--------------------------------------\n")

print("Todos os cálculos foram finalizados.")
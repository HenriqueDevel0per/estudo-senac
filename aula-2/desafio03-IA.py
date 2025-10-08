try:
    num_pessoas = int(input("Quantos cálculos de IMC você deseja realizar? "))
except ValueError:
    print("Número inválido. O programa será encerrado.")
    num_pessoas = 0


for i in range(num_pessoas):
    print(f"\n--- Inserindo dados para a Pessoa {i + 1} de {num_pessoas} ---")
    

    nome = input("Digite o nome da pessoa: ")
    try:
        idade = int(input("Digite a idade: "))
        peso = float(input("Digite o peso (em kg, ex: 70.5): "))
        altura = float(input("Digite a altura (em metros, ex: 1.75): "))

        if peso <= 0 or altura <= 0 or idade <=0:
            print("\nErro: Idade, peso e altura devem ser valores positivos. Pulando para a próxima pessoa.\n")
            continue

    except ValueError:
        print("\nErro: Dados inválidos. Pulando para a próxima pessoa.\n")
        continue


    imc = peso / (altura ** 2)

    if imc < 18.5:
        classificacao = "Abaixo do peso"
    elif 18.5 <= imc < 25:
        classificacao = "Peso ideal (Parabéns!)"
    elif 25 <= imc < 30:
        classificacao = "Levemente acima do peso"
    elif 30 <= imc < 35:
        classificacao = "Obesidade Grau I"
    elif 35 <= imc < 40:
        classificacao = "Obesidade Grau II (Severa)"
    else:
        classificacao = "Obesidade Grau III (Mórbida)"

    print("\n---------- Resultado do IMC ----------\n")
    print(f"Nome: {nome}")
    print(f"Idade: {idade} anos")
    print(f"Peso: {peso:.2f} kg")
    print(f"Altura: {altura:.2f} m")
    print(f"IMC Calculado: {imc:.2f}")
    print(f"Classificação: {classificacao}\n")
    print("--------------------------------------\n")

print("Todos os cálculos foram finalizados.")
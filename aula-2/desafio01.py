for i in range(5):
    nome = input("Insira seu nome: ")
    nota1 = float(input("Insira nota da AVA1: "))
    nota2 = float(input("Insira nota da AVA2: "))
    media = (nota1 + nota2) / 2
    
    if media >= 7:
        situacao = "Aprovado"
    elif media >= 5:
        situacao = "Recuperacao"
    else:
        situacao = "Reprovado"

    print("\nResultado do Semestre")
    print(f"Nome: {nome}")
    print(f"Prova 1: {nota1}")
    print(f"Prova 2: {nota2}")
    print(f"Media: {media}")
    print(f"Situação: {situacao}\n\n\n")
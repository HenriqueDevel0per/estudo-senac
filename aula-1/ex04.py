nome = input("Insira seu nome: ")
nota1 = float(input("Insira nota da AVA1: "))
nota2 = float(input("Insira nota da AVA2: "))

media = (nota1 + nota2) / 2

if media >= 7:
    print(f"{nome} você foi aprovado com {media} de nota final")
elif media > 5 and media <7:
    print(f"{nome} você está de recuperação sua média foi {media}")
else:
    print(f"{nome} você foi Reprovado, sua nota foi {media}")
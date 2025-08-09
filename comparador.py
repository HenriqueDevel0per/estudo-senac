# Mathusa

nome1 = input("Digite o nome do primeiro amigo: ")
idade1 = int(input(f"Digite a idade de {nome1}: "))

nome2 = input("Digite o nome do segundo amigo: ")
idade2 = int(input(f"Digite a idade de {nome2}: "))

nome3 = input("Digite o nome do terceiro amigo: ")
idade3 = int(input(f"Digite a idade de {nome3}: "))

# Descobrir o mais velho
if idade1 >= idade2 and idade1 >= idade3:
    mais_velho_nome = nome1
    mais_velho_idade = idade1
#elif idade2 >= idade1 and idade2 >= idade3:
elif idade2 >= idade3:
    mais_velho_nome = nome2
    mais_velho_idade = idade2
else:
    mais_velho_nome = nome3
    mais_velho_idade = idade3

print(f"\nO amigo mais velho é {mais_velho_nome} com {mais_velho_idade} anos.")
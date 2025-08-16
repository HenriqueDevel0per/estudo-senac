op = int(input("\nVocê faz parte de qual setor? 1 - RH  2 - Tecnologia  3 - ADM   4 - Juridico : "))
 
print("\n\n")

match op:
    case 1:
        print("O time de RH fez um total de 500 Pontos obtendo um total de 20%  de bonus salarial")
    case 2:
        print("O time de Tecnologia fez um total de 400 Pontos obtendo um total de 15%  de bonus salarial")
    case 3:
        print("O time de ADM fez um total de 300 Pontos obtendo um total de 10%  de bonus salarial")
    case 4:
        print("O time de Juridico fez um total de 100 Pontos obtendo um total de 5%  de bonus salarial")
    case _:
        print("Opção Inválida! ")
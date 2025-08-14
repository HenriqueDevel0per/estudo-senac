#aula-4

clb1 = str(input("\ninsira o nome do colaborador 1: "))
sex1 = str(input(f"\nInsira o sexo de {clb1}, H para Homem e M para Mulher : "))
estcv1 = str(input(f"\ninsira estado civil de {clb1}: C para Casado e S para Solteiro : "))
slr1 = float(input(f"\nInsira o salario atual de {clb1} R$ :"))


clb2 = str(input("\ninsira o nome do colaborador 2: "))
sex2 = str(input(f"\nInsira o sexo de {clb2}, H para Homem e M para Mulher : "))
estcv2 = str(input(f"\ninsira estado civil de {clb2} C para Casado e S para Solteiro : "))
slr2 = float(input(f"\nInsira o salario atual de {clb2}: "))


clb3 = str(input("\ninsira o nome do colaborador 3: "))
sex3 = str(input(f"\nInsira o sexo de {clb3}, H para Homem e M para Mulher : "))
estcv3 = str(input(f"\ninsira estado civil de {clb3}:C para Casado e S para Solteiro : "))
slr3 = float(input(f"\nInsira o salario atual de {clb3} : "))

if sex1 == "H" and estcv1 == "S":
    newslr1 = slr1 * 1.20
    print(f"\no Salário de {clb1} passou de R${slr1} para R$ {newslr1}")
if sex2 == "H" and estcv2 == "S":
    newslr2 = slr2 * 1.20
    print(f"\no Salário de {clb2} passou de R${slr2} para R$ {newslr2}")
if sex3 == "H" and estcv3 == "S":
    newslr3 = slr3 * 1.20
    print(f"\no Salário de {clb3} passou de R${slr3} para R$ {newslr3}")

if sex1 == "M" and estcv1 == "C":
    newslr1 = slr1 * 1.30
    print(f"\no Salário de {clb1} passou de R${slr1} para R$ {newslr1}")
if sex2 == "M" and estcv2 == "C":
    newslr2 = slr2 * 1.30
    print(f"\no Salário de {clb2} passou de R${slr2} para R$ {newslr2}")
if sex3 == "M" and estcv3 == "C":
    newslr3 = slr3 * 1.30
    print(f"\no Salário de {clb3} passou de R${slr3} para R$ {newslr3}")
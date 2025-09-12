''' Obter dados de 3 colaboradores e reajustar seus
    salários de acordo com condições'''

# Obter dados
c1  = input("Primeiro colaborador: ")
sal1 = float(input("Seu salário: "))
sx1 = input("Sexo: M-Masculino   F-Feminino: ")
ec1 = input("Estado Civil: S-Solteiro   C-Casado: ")

print("\n")
c2  = input("Segundo colaborador: ")
sal2 = float(input("Seu salário: "))
sx2 = input("Sexo: M-Masculino   F-Feminino: ")
ec2 = input("Estado Civil: S-Solteiro   C-Casado: ")

print("\n")
c3  = input("Segundo colaborador: ")
sal3 = float(input("Seu salário: "))
sx3 = input("Sexo: M-Masculino   F-Feminino: ")
ec3 = input("Estado Civil: S-Solteiro   C-Casado: ")

# Processamento
# Primeiro colaborador
if sx1 == "M":
   if ec1 == "S":
     slnovo1 = sal1 * 1.20 # Reajuste de 20%
     print(c1, "salário antigo: ",sal1," salário novo: ", slnovo1)
   else:
     slnovo1 = sal1 # Não recebeu reajuste
     print(c1, "salário antigo: ",sal1," salário novo: ", slnovo1)   
else:
   if ec1 == "C":
     slnovo1 = sal1 * 1.30   # Reajuste de 30%
     print(c1, "salário antigo: ",sal1," salário novo: ", slnovo1)
   else:
     slnovo1 = sal1   # Não recebeu reajuste
     print(c1, "salário antigo: ",sal1," salário novo: ", slnovo1)     

print("\n")     
# Segundo colaborador
if sx2 == "M":
   if ec2 == "S":
     slnovo2 = sal2 * 1.20 # Reajuste de 20%
     print(c2, "salário antigo: ",sal2," salário novo: ", slnovo2)
   else:
     slnovo1 = sal1 # Não recebeu reajuste
     print(c2, "salário antigo: ",sal2," salário novo: ", slnovo2)   
else:
   if ec2 == "C":
     slnovo2 = sal2 * 1.30   # Reajuste de 30%
     print(c2, "salário antigo: ",sal2," salário novo: ", slnovo2)
   else:
     slnovo2 = sal2   # Não recebeu reajuste
     print(c2, "salário antigo: ",sal2," salário novo: ", slnovo2)     

print("\n")     
# Terceiro colaborador
if sx3 == "M":
   if ec3 == "S":
     slnovo3 = sal3 * 1.20 # Reajuste de 20%
     print(c3, "salário antigo: ",sal3," salário novo: ", slnovo3)
   else:
     slnovo3 = sal3 # Não recebeu reajuste
     print(c3, "salário antigo: ",sal3," salário novo: ", slnovo3)   
else:
   if ec3 == "C":
     slnovo3 = sal3 * 1.30   # Reajuste de 30%
     print(c3, "salário antigo: ",sal3," salário novo: ", slnovo3)
   else:
     slnovo2 = sal2   # Não recebeu reajuste
     print(c3, "salário antigo: ",sal3," salário novo: ", slnovo3)     

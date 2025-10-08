# 1. Criamos uma lista vazia para guardar os dados dos funcionários
funcionarios_cadastrados = []
# 2. Iniciamos o contador em 1 para cadastrar 3 pessoas
contador = 1

print("--- Início do Cadastro de Funcionários ---")

# O laço agora funciona corretamente, de 1 a 3
while contador <= 3:
    print(f"\n--- Inserindo dados do Funcionário {contador}/3 ---")
    
    nome = input("Insira seu nome: ") 
    cpf = input("Insira seu CPF: ")
    sal_brt = float(input("Insira seu salário bruto: R$ "))

    # Lógica do INSS e Cargo (com o 'elif' simplificado)
    if sal_brt >= 1897.12:
        inss = sal_brt * 0.11
        cargo = "Acionista"
    elif sal_brt >= 1500: # <-- Lógica simplificada
        inss = sal_brt * 0.09
        cargo = "Gerente" 
    else:
        inss = sal_brt * 0.08
        cargo = "Vendedor"

    # Lógica do Vale Transporte
    if sal_brt >= 1500:
        vale = sal_brt * 0.06
    else:
        vale = sal_brt * 0.05

    sal_liq = sal_brt - (vale + inss)
    
    # 3. Armazenamos os resultados em um dicionário
    dados = {
        "nome": nome,
        "cpf": cpf,
        "cargo": cargo,
        "salario_bruto": sal_brt,
        "desconto_vale": vale,
        "desconto_inss": inss,
        "salario_liquido": sal_liq
    }
    # E adicionamos o dicionário à nossa lista
    funcionarios_cadastrados.append(dados)
    
    print(f"✅ Funcionário '{nome}' cadastrado com sucesso!")

    # 4. ESSENCIAL: Incrementamos o contador para evitar o loop infinito
    contador += 1

# --- Resumo Final ---
print("\n==========================================")
print("    RELATÓRIO FINAL DE FUNCIONÁRIOS")
print("==========================================")

# Agora podemos exibir os dados de todos que foram cadastrados
for func in funcionarios_cadastrados:
    print(f"\nNome: {func['nome']} (CPF: {func['cpf']})")
    print(f"Cargo: {func['cargo']}")
    # 4. Usamos ':.2f' para formatar os valores como moeda
    print(f"Salário Bruto: R$ {func['salario_bruto']:.2f}")
    print(f"Desconto Vale Transporte: R$ {func['desconto_vale']:.2f}")
    print(f"Desconto INSS: R$ {func['desconto_inss']:.2f}")
    print(f"Salário Líquido a Receber: R$ {func['salario_liquido']:.2f}")
    print("------------------------------------------")
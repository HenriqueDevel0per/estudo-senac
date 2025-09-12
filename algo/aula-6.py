nome = str(input("\nInsira seu nome: "))

salr = int(input(f"\n{nome} qual seu sálario : R$ "))

totvend = int(input(f"\n{nome} qual seu total de vendas? :"))

#processamento de dados

match totvend:
    case _ if totvend >= 5000:
        comissao = salr * 0.30
        novsalr = salr * 1.30
        print(f"\n\{nome} seu salário de R$ {salr}, será acrescido a comissão de R$ {comissao}, dando um total de R$ {novsalr}")
#
    case _ if totvend >= 3000: 
        comissao = salr * 0.20
        novsalr = salr * 1.20
        print(f"{nome} seu salário de R$ {salr}, será acrescido a comissão de R$ {comissao} , dando um total de R$ {novsalr}")
#
    case _ if totvend >= 2000:
        comissao = salr * 0.10
        novsalr = salr * 1.10
        print(f"{nome} seu salário de R$ {salr}, será acrescido a comissão de R$ {comissao} , dando um total de R$ {novsalr}")
#
    case _ if totvend >= 1000:
        comissao = salr * 0.05
        novsalr = salr * 1.05
        print(f"{nome} seu salário de R$ {salr}, será acrescido a comissão de R$ {comissao} , dando um total de R$ {novsalr}")
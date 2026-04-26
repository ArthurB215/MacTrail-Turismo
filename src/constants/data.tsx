export type Lugar = {
  id: number;
  imagem: any;
  nome: string;
  pais: string;
  rating: number;
  localizacao: string;
  descricao: string;
};

export const lugares: Lugar[] = [
  {
      id: 0,
      imagem: require("../../assets/images/chile.png"),
      nome: "Cordilheira dos Andes",
      pais: "Chile",
      rating: 4.7,
      localizacao: "América do Sul",
      descricao:
        "Andes é uma vasta cadeia montanhosa formada por um sistema contínuo de montanhas ao longo da costa ocidental da América do Sul, tendo a sua formação geológica datada no período Terciário. A cordilheira possui aproximadamente oito mil quilômetros de extensão. É a maior cadeia de montanhas do mundo, e em seus trechos mais largos chega a 160 km do extremo leste ao oeste. Sua altitude média gira em torno de 4000 m e seu ponto culminante é o monte Aconcágua, com 6962 m de altitude. A cordilheira dos Andes se estende desde a Patagônia até a costa do mar do Caribe, atravessando todo o continente sul-americano de sul a norte, caracterizando a paisagem montanhosa do Argentina, Chile, Bolívia, Peru, Equador, Colômbia e oeste da Venezuela também conhecidos como América Andina.",
    },
    {
      id: 1,
      imagem: require("../../assets/images/japao.png"),
      nome: "Monte Fuji",
      pais: "Japão",
      rating: 4.8,
      localizacao: "Ásia",
      descricao:
        "O monte Fuji é a mais alta montanha da ilha de Honshu e de todo o arquipélago japonês. É um vulcão ativo, porém de baixo risco de erupção. O monte Fuji localiza-se a oeste de Tóquio próximo da costa do oceano Pacífico da ilha de Honshu, na fronteira entre as províncias de Shizuoka e de Yamanashi. Existem três pequenas cidades que envolvem o Monte Fuji, Gotemba a leste, Fuji-Yoshida a norte e Fujinomiya a sudoeste. O monte Fuji é um dos símbolos mais conhecidos do Japão, sendo frequentemente retratado em obras de arte e fotografias e recebendo muitas visitas de alpinistas turistas.",
    },
    {
      id: 2,
      imagem: require("../../assets/images/china.png"),
      nome: "Templo do Céu",
      pais: "China",
      rating: 4.6,
      localizacao: "Ásia",
      descricao:
        "O Templo do Céu é um complexo de templos taoístas em Pequim, o maior do seu gênero em toda a República Popular da China. Foi construído no ano 1420 e tanto a Dinastia Ming como a Dinastia Qing o utilizaram para pedir a intercessão celestial para as colheitas e dar graças ao Céu pelos frutos obtidos. Desde 1998 que é considerado Património da Humanidade pela UNESCO. Está situado no parque Tiantan Gongyuan, a sul de Pequim. O Templo do Céu inclui a norte a Sala de Oração pelas Boas Colheitas; a sul, o Altar Circular e a Abóbada Imperial Celestial. O conjunto está rodeado de uma muralha interior e outra exterior formadas por uma base rectangular que simboliza a Terra, rematadas com formas arredondadas para simbolizar o Céu. As muralhas dividem o recinto em duas zonas: a interior e a exterior.",
    },
    {
      id: 3,
      imagem: require("../../assets/images/franca.png"),
      nome: "Torre Eiffel",
      pais: "França",
      rating: 4.9,
      localizacao: "Europa",
      descricao:
        "Torre Eiffel é uma torre de treliça de ferro forjado no Champ de Mars, em Paris, França. Tem o nome do engenheiro Gustave Eiffel, cuja empresa projetou e construiu a torre. Localmente apelidada de 'Dama de Ferro', foi construída de 1887 a 1889 como a peça central da Exposição Universal de 1889 e foi inicialmente criticada por alguns dos principais artistas e intelectuais franceses por seu design, mas tornou-se um ícone cultural global da França e uma das estruturas mais reconhecidas do mundo. A Torre Eiffel é o monumento pago mais visitado do mundo; 6,91 milhões de pessoas subiram na torre em 2015. Foi designado um monumento histórico em 1964 e foi nomeado parte do Patrimônio Mundial pela UNESCO em 1991. A torre tem 330 metros de altura, aproximadamente a mesma altura de um edifício de 110 andares, e é a estrutura mais alta de Paris. Sua base é quadrada, medindo 125 metros de cada lado.",
    },
    {
      id: 4,
      imagem: require("../../assets/images/coreia.png"),
      nome: "Namsan Seoul Tower",
      pais: "Coreia do Sul",
      rating: 4.5,
      localizacao: "Ásia",
      descricao:
        "Construída entre 1969 e 1975, com um custo de aproximadamente $2,5 milhões, foi aberta ao público em 1980. Desde então, a torre tem sido um marco de Seul. Mede 236,7 metros de altura (a partir da base) e chega até 479,7 metros acima do nível do mar. Quando o proprietário original da N Seoul Tower realizou uma fusão com a CJ Corporation, recebeu o nome oficial de CJ Seoul Tower. Também é conhecida como Namsan Tower ou Seoul Tower.",
    },
    {
      id: 5,
      imagem: require("../../assets/images/brasilRJ.png"),
      nome: "Cristo Redentor",
      pais: "Brasil",
      rating: 4.8,
      localizacao: "América do Sul",
      descricao:
        "Cristo Redentor é uma estátua que retrata Jesus Cristo, localizada no topo do morro do Corcovado, a 709 metros acima do nível do mar, dentro do Parque Nacional da Tijuca. Tem vista para parte considerável da cidade brasileira do Rio de Janeiro, sendo a frente da estátua voltada para a Baía de Guanabara e as costas para a Floresta da Tijuca. Feito de concreto armado e pedra-sabão, tem trinta metros de altura (uma das maiores estátuas do mundo), sem contar os oito metros do pedestal, sendo a mais alta estátua do mundo no estilo Art Déco. Seus braços se esticam por 28 metros de largura e a estrutura pesa 1145 toneladas. O monumento é um santuário católico e a Arquidiocese do Rio de Janeiro administra a estátua e a capela localizada dentro do seu pedestal, além de também ser responsável pelas celebrações e manutenção do conjunto.",
    },
    {
      id: 6,
      imagem: require("../../assets/images/brasilBA.png"),
      nome: "Elevador Lacerda",
      pais: "Brasil",
      rating: 4.5,
      localizacao: "América do Sul",
      descricao:
        "O Elevador Lacerda é um sistema de transporte público da cidade de Salvador, capital do estado brasileiro da Bahia. Trata-se do primeiro elevador urbano do mundo. Em 8 de dezembro de 1873, quando a primeira torre foi inaugurada, era o elevador mais alto do mundo, com 63 metros. A estrutura atual, de 1930, tem 72 metros de altura. Faz o transporte de pessoas entre a Praça Cairu, na Cidade Baixa, e a Praça Tomé de Sousa, na Cidade Alta. É um dos principais pontos turísticos e cartão-postal da cidade. Do alto de suas torres, descortina-se a vista para a Baía de Todos-os-Santos, o Mercado Modelo e, ao fundo, o Forte de São Marcelo.",
    },
    {
      id: 7,
      imagem: require("../../assets/images/italia.png"),
      nome: "Panteão",
      pais: "Itália",
      rating: 4.8,
      localizacao: "Europa",
      descricao:
        "Panteão é um edifício em Roma, Itália, encomendado por Marco Vipsânio Agripa durante o reinado do imperador Augusto e reconstruído por Adriano por volta de 126. Sua planta é circular com um pórtico de grandes colunas coríntias de granito suportando um frontão. Um vestíbulo retangular liga o pórtico à rotunda, que está coberta por uma enorme cúpula de caixotões de concreto encimada por uma abertura central descoberta. Quase dois mil anos depois de ter sido construído, esta cúpula é ainda hoje a maior cúpula de concreto não armado do mundo. A altura até o óculo e o diâmetro da circunferência interior são idênticos, 43,3 metros. É uma das mais bem preservadas estruturas romanas antigas e permaneceu em uso por toda a sua história.",
    },
];
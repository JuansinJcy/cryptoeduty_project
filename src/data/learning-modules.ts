export interface LessonTopic {
  title: string;
  content: string;
  tip?: string;
}

export interface LearningModule {
  id: number;
  title: string;
  level: number;
  levelName: string;
  levelColor: string;
  duration: string;
  icon: string;
  description: string;
  topics: LessonTopic[];
  keyTerms: string[];
  securityTip?: string;
}

export const learningModules: LearningModule[] = [
  // ===== NIVEL 1: PRINCIPIANTE =====
  {
    id: 1,
    title: "Introducción a Criptomonedas",
    level: 1,
    levelName: "Principiante",
    levelColor: "#22c55e",
    duration: "15 min",
    icon: "🪙",
    description: "Descubre qué son las criptomonedas, cómo nacieron y por qué están cambiando el mundo financiero. Un punto de partida claro y sin tecnicismos.",
    topics: [
      {
        title: "¿Qué son las criptomonedas?",
        content: "Las criptomonedas son dinero digital que funciona sin bancos ni gobiernos. Usan matemáticas avanzadas (criptografía) para asegurar que cada transacción sea segura y no pueda ser falsificada. La primera y más conocida es Bitcoin, creada en 2009 por una persona (o grupo) bajo el seudónimo Satoshi Nakamoto. Hoy existen miles de criptomonedas, cada una con propósitos diferentes.",
        tip: "Piensa en las criptomonedas como dinero en tu teléfono que no necesita un banco para funcionar."
      },
      {
        title: "Diferencias con el dinero tradicional",
        content: "El dinero que usamos todos los días (dólares, euros, quetzales) es controlado por bancos centrales y gobiernos. Ellos deciden cuánto dinero imprimir y qué comisiones cobrar. Las criptomonedas funcionan de forma distinta: no hay una autoridad central que las controle, las transacciones se verifican entre los mismos usuarios de la red, y la cantidad máxima de muchas monedas está limitada por código (no se pueden imprimir más).",
        tip: "Una diferencia clave: los bancos pueden congelar tu cuenta, pero con cripto, tú eres el único dueño de tu dinero."
      },
      {
        title: "Beneficios y riesgos",
        content: "Beneficios: acceso global (cualquier persona con internet puede usarlas), transacciones rápidas entre países sin intermediarios, y privacidad en tus operaciones. Riesgos: el precio cambia mucho (volatilidad), si pierdes tus claves de acceso pierdes tu dinero sin recuperación, y existen estafas que aprovechan la falta de conocimiento de los principiantes.",
        tip: "Nunca inviertas dinero que no puedas permitirte perder. Es la regla de oro del mundo cripto."
      },
      {
        title: "Casos de uso reales",
        content: "Las criptomonedas ya se usan en muchos lugares: enviar dinero a familiares en otros países con comisiones mínimas, pagar servicios en línea de forma privada, proteger ahorros en países con inflación alta (como Venezuela o Argentina), y acceder a servicios financieros en regiones donde los bancos no llegan. También se usan para comprar arte digital (NFTs) y en videojuegos que premian a los jugadores."
      }
    ],
    keyTerms: ["Criptografía", "Descentralización", "Volatilidad", "Satoshi Nakamoto", "Bitcoin"],
    securityTip: "Antes de comprar cualquier criptomoneda, investiga el proyecto. Si suena demasiado bueno para ser verdad, probablemente sea una estafa."
  },
  {
    id: 2,
    title: "Blockchain Básico",
    level: 1,
    levelName: "Principiante",
    levelColor: "#22c55e",
    duration: "20 min",
    icon: "🔗",
    description: "Entiende la tecnología que hace posible las criptomonedas: la cadena de bloques. Aprende cómo se registran y protegen las transacciones.",
    topics: [
      {
        title: "¿Qué es blockchain?",
        content: "Imagina un cuaderno de contabilidad que miles de personas tienen copias idénticas. Cada vez que alguien hace una transacción, se anota en todas las copias al mismo tiempo. Nadie puede borrar o modificar una página ya escrita. Eso es blockchain: una cadena de bloques donde cada bloque contiene un grupo de transacciones, y están conectados entre sí como eslabones de una cadena. Si alguien intenta cambiar un bloque, toda la cadena se rompe y todos los demás se dan cuenta.",
        tip: "Blockchain es como un diario que no se puede borrar, que miles de personas vigilan al mismo tiempo."
      },
      {
        title: "Validación de transacciones",
        content: "Cuando envías criptomonedas, tu transacción no se confirma de inmediato. Primero va a una 'sala de espera' llamada mempool. Allí, personas llamadas mineros o validadores revisan que tengas el dinero que quieres enviar y que la transacción sea legítima. Una vez verificada, se agrupa con otras transacciones en un bloque y se añade a la cadena. Este proceso puede tardar desde segundos hasta minutos, dependiendo de la red.",
      },
      {
        title: "Proof of Work vs Proof of Stake",
        content: "Son dos formas de validar transacciones: Proof of Work (Prueba de Trabajo): los mineros compiten resolviendo problemas matemáticos complejos. El primero en resolverlo añade el bloque y gana una recompensa. Usa mucha energía eléctrica. Bitcoin usa este sistema. Proof of Stake (Prueba de Participación): en lugar de competir, los validadores son elegidos según la cantidad de criptomonedas que han 'apostado' (bloqueado) en la red. Usa mucha menos energía. Ethereum cambió a este sistema en 2022.",
        tip: "Piensa en PoW como una carrera donde el más rápido gana, y PoS como una rifa donde más boletos tienes, más probabilidad de ganar."
      },
      {
        title: "Inmutabilidad y transparencia",
        content: "Una vez que una transacción se registra en blockchain, no se puede borrar ni modificar. Esto se llama inmutabilidad y es lo que da confianza al sistema. Además, todas las transacciones son públicas: cualquiera puede ver cuánto se envió y a qué dirección (aunque no quién está detrás de esa dirección). Esta transparencia permite auditar la red y verificar que todo funcione correctamente.",
      }
    ],
    keyTerms: ["Bloque", "Cadena", "Mempool", "Minería", "Validador", "Inmutabilidad"],
    securityTip: "La inmutabilidad de blockchain significa que si envías dinero a una dirección equivocada, no hay botón de 'deshacer'. Siempre verifica la dirección antes de enviar."
  },

  // ===== NIVEL 2: INTERMEDIO =====
  {
    id: 3,
    title: "Wallets y Almacenamiento",
    level: 2,
    levelName: "Intermedio",
    levelColor: "#eab308",
    duration: "25 min",
    icon: "👛",
    description: "Aprende a guardar tus criptomonedas de forma segura. Conoce los tipos de wallets, las claves y las frases de recuperación.",
    topics: [
      {
        title: "Tipos de wallets",
        content: "Una wallet (billetera) es el programa o dispositivo donde guardas tus criptomonedas. Existen varios tipos: Hot wallets (calientes): aplicaciones en tu teléfono o computadora conectadas a internet. Son convenientes pero menos seguras. Ejemplos: MetaMask, Trust Wallet. Cold wallets (frías): dispositivos físicos que no se conectan a internet. Son más seguras para almacenar grandes cantidades. Ejemplos: Ledger, Trezor. Paper wallets: claves impresas en papel. Muy seguras si se guardan bien, pero frágiles si se pierden o dañan.",
        tip: "Para uso diario, una hot wallet está bien. Para ahorro a largo plazo, usa una cold wallet."
      },
      {
        title: "Claves públicas y privadas",
        content: "Tu wallet tiene dos claves que trabajan juntas: Clave pública: es como tu número de cuenta bancaria. La compartes con otros para que te envíen criptomonedas. Empieza con letras y números y es segura para compartir. Clave privada: es como tu PIN o contraseña maestra. Con ella puedes mover tus criptomonedas. NUNCA la compartas con nadie. Si alguien obtiene tu clave privada, tiene acceso total a tu dinero y no hay forma de recuperarlo.",
        tip: "Tu clave pública = tu dirección para recibir. Tu clave privada = tu llave para gastar. ¡Protege la privada con tu vida!"
      },
      {
        title: "Frases semilla",
        content: "Cuando creas una wallet, se te da una frase de 12 o 24 palabras (llamada frase semilla o seed phrase). Esta frase es la copia de seguridad maestra de tu wallet. Si pierdes tu teléfono, rompes tu dispositivo o borras la aplicación, puedes recuperar todo con esa frase. Escríbela en papel (nunca digitalmente), guárdala en un lugar seguro, y nunca la compartas. Quien tenga tu frase semilla tiene acceso completo a tus criptomonedas.",
      },
      {
        title: "Seguridad básica de wallets",
        content: "Reglas esenciales para proteger tus criptomonedas: 1) Escribe tu frase semilla en papel y guárdala en un lugar seguro (caja fuerte idealmente). 2) Nunca guardes tu frase semilla en notas del teléfono, capturas de pantalla o en la nube. 3) Activa la autenticación de dos factores (2FA) cuando sea posible. 4) No uses redes WiFi públicas para hacer transacciones. 5) Verifica siempre las direcciones antes de enviar. 6) Usa wallets de fuentes oficiales (descarga solo desde sitios verificados).",
      }
    ],
    keyTerms: ["Hot wallet", "Cold wallet", "Clave pública", "Clave privada", "Frase semilla", "2FA"],
    securityTip: "Si alguien te pide tu frase semilla o clave privada, es una estafa. Nadie legítimo jamás te pedirá esa información."
  },
  {
    id: 4,
    title: "Transacciones y Direcciones",
    level: 2,
    levelName: "Intermedio",
    levelColor: "#eab308",
    duration: "20 min",
    icon: "📤",
    description: "Entiende cómo funcionan las transacciones en blockchain: su anatomía, comisiones, tiempos y cómo rastrearlas.",
    topics: [
      {
        title: "Anatomía de una transacción",
        content: "Cada transacción cripto tiene estos elementos: Remitente (quién envía), Destinatario (quién recibe), Cantidad (cuánto se envía), Comisión (pago a los validadores), y Firma digital (prueba de que el remitente autorizó la transacción). La transacción se firma con tu clave privada sin revelarla, demostrando que tú eres el dueño de los fondos sin exponer tu información.",
      },
      {
        title: "Comisiones de red",
        content: "Las comisiones (o gas fees) son los pagos que haces a los validadores por procesar tu transacción. En Bitcoin se llaman 'miner fees' y en Ethereum 'gas'. Las comisiones varían según la congestión de la red: si muchas personas están usando la red, las comisiones suben. Puedes elegir pagar más para que tu transacción se procese más rápido, o menos si no tienes prisa. En redes como Bitcoin, la comisión no depende del monto: enviar $10 o $1 millón cuesta lo mismo en comisión.",
        tip: "Las comisiones suelen ser más bajas en fines de semana y horas de menor actividad."
      },
      {
        title: "Tiempo de confirmación",
        content: "Una transacción no es 'definitiva' en el momento en que la envías. Necesita confirmaciones: cada confirmación es un nuevo bloque añadido a la cadena después del tuyo. En Bitcoin, se recomienda esperar 6 confirmaciones (aproximadamente 1 hora) para considerar una transacción segura. En Ethereum, 12-30 confirmaciones (unos minutos). En redes más rápidas como Solana, las confirmaciones pueden tardar segundos. Más confirmaciones = más seguridad de que la transacción no será revertida.",
      },
      {
        title: "Exploradores de blockchain",
        content: "Los exploradores de blockchain son como 'Google Maps' para criptomonedas. Son sitios web gratuitos donde puedes buscar cualquier transacción, dirección o bloque. Algunos populares: blockchain.com (Bitcoin), etherscan.io (Ethereum), solscan.io (Solana). Con ellos puedes verificar si una transacción fue completada, ver el saldo de cualquier dirección, y rastrear el movimiento de fondos. Solo necesitas el hash (identificador) de la transacción o la dirección.",
        tip: "Siempre verifica tus transacciones en un explorador. Es la forma más segura de confirmar que tu envío llegó."
      }
    ],
    keyTerms: ["Hash", "Gas fee", "Confirmación", "Explorador de bloques", "Firma digital"],
    securityTip: "Antes de enviar una gran cantidad, haz una prueba con una cantidad pequeña. Verifica que llegó correctamente antes de enviar el resto."
  },
  {
    id: 5,
    title: "Seguridad en Cripto",
    level: 2,
    levelName: "Intermedio",
    levelColor: "#eab308",
    duration: "30 min",
    icon: "🛡️",
    description: "Protege tus inversiones aprendiendo a identificar estafas, phishing y otros peligros del ecosistema cripto.",
    topics: [
      {
        title: "Estafas comunes",
        content: "Las estafas más frecuentes en cripto son: Esquemas Ponzi: prometen ganancias garantizadas usando el dinero de nuevos inversores para pagar a los anteriores. Rug pulls: los creadores de un proyecto desaparecen con todo el dinero invertido. Airdrops falsos: te ofrecen criptomonedas gratis a cambio de conectar tu wallet a un sitio malicioso. Esquemas de pump and dump: inflan el precio de una moneda para vender cuando está alta, dejando a otros con pérdidas. Regla de oro: si prometen ganancias seguras, es una estafa.",
        tip: "Investiga siempre: busca opiniones, revisa el equipo del proyecto y desconfía de promesas de ganancias fáciles."
      },
      {
        title: "Phishing y ingeniería social",
        content: "El phishing es cuando alguien se hace pasar por un sitio o persona de confianza para robarte información. En cripto, los métodos más comunes son: correos que parecen de tu wallet pidiendo 'verificar tu cuenta', enlaces falsos en redes sociales que imitan sitios oficiales, mensajes directos ofreciendo 'soporte técnico', y grupos de Telegram o Discord con 'señales de inversión'. Siempre accede a tus wallets escribiendo la URL manualmente o usando marcadores guardados.",
      },
      {
        title: "Protección contra malware",
        content: "El malware cripto puede robar tus claves o cambiar direcciones de destino sin que te des cuenta. Para protegerte: instala un antivirus actualizado, no descargues programas de fuentes no confiables, usa extensiones de navegador solo de desarrolladores verificados, revisa que las URLs sean correctas (cuidado con errores de tipeo como 'metamask' vs 'metamäsk'), y mantén tu sistema operativo actualizado. Una medida extra: usa un navegador dedicado solo para operaciones cripto.",
      },
      {
        title: "Backup de wallets",
        content: "Hacer copias de seguridad correctamente puede salvarte de perder todo: 1) Escribe tu frase semilla en papel o en placas de metal (resistentes al fuego y agua). 2) Haz más de una copia y guárdalas en lugares diferentes. 3) Nunca digitalices tu frase semilla (no la fotografíes, no la guardes en la nube). 4) Verifica periódicamente que tus copias están intactas y legibles. 5) Considera usar un sistema de almacenamiento 'multisig' (múltiples firmas) para cantidades grandes, donde se necesitan varias aprobaciones para mover fondos.",
      }
    ],
    keyTerms: ["Ponzi", "Rug pull", "Phishing", "Malware", "Multisig", "Ingeniería social"],
    securityTip: "Ningún proyecto legítimo te pedirá que envíes criptomonedas para 'verificar' tu cuenta o para recibir más de vuelta. Eso siempre es una estafa."
  },

  // ===== NIVEL 3: AVANZADO =====
  {
    id: 6,
    title: "Bitcoin en Profundidad",
    level: 3,
    levelName: "Avanzado",
    levelColor: "#3b82f6",
    duration: "35 min",
    icon: "₿",
    description: "Sumérgete en Bitcoin: su historia, cómo funciona la minería, el halving y la red Lightning para pagos rápidos.",
    topics: [
      {
        title: "Historia de Bitcoin",
        content: "Bitcoin nació el 3 de enero de 2009 cuando se minó el primer bloque (bloque génesis). Fue creado por Satoshi Nakamoto, cuya identidad real sigue siendo un misterio. En 2010 se realizó la primera compra con Bitcoin: 10,000 BTC por dos pizzas (ahora valdrían millones). A lo largo de los años, Bitcoin ha superado crisis, prohibiciones y críticas, consolidándose como la criptomoneda más valiosa y reconocida del mundo. Su precio ha pasado de menos de un centavo a más de $100,000 por moneda.",
        tip: "El 'Día de las Pizzas' se celebra cada 22 de mayo en la comunidad cripto para recordar esa primera compra."
      },
      {
        title: "Minería y nodos",
        content: "Los mineros son computadoras que procesan transacciones y las agrupan en bloques. Para añadir un bloque, deben resolver un problema matemático que requiere mucha potencia de cálculo. El primero en resolverlo gana la recompensa (actualmente 3.125 BTC) más las comisiones de las transacciones incluidas. Los nodos, por otro lado, son computadoras que mantienen una copia completa de blockchain y verifican que todo cumpla las reglas. No ganan recompensas, pero son esenciales para la red porque aseguran que nadie haga trampa.",
      },
      {
        title: "Halving y oferta limitada",
        content: "Bitcoin tiene un límite máximo de 21 millones de monedas. Para controlar la emisión, cada 210,000 bloques (aproximadamente cada 4 años), la recompensa de los mineros se reduce a la mitad. Esto se llama 'halving'. El primer halving fue en 2012 (de 50 a 25 BTC), luego 2016 (25 a 12.5), 2020 (12.5 a 6.25), y 2024 (6.25 a 3.125). Históricamente, cada halving ha sido seguido por un aumento significativo en el precio de Bitcoin, aunque el rendimiento pasado no garantiza resultados futuros.",
        tip: "Solo existirán 21 millones de Bitcoin. Esa escasez programada es una de las razones de su valor."
      },
      {
        title: "Lightning Network",
        content: "Lightning Network es una 'segunda capa' construida sobre Bitcoin que permite transacciones casi instantáneas y con comisiones de centavos. Funciona creando canales de pago entre usuarios: pueden hacer miles de transacciones entre ellos sin que cada una vaya a la blockchain principal. Solo registran en blockchain cuando abren y cierran el canal. Esto hace que Bitcoin sea útil para pagos diarios como comprar café o pagar servicios, algo que sería costoso y lento en la red principal.",
      }
    ],
    keyTerms: ["Halving", "Nodo", "Lightning Network", "Bloque génesis", "Recompensa de bloque"],
    securityTip: "La minería de Bitcoin requiere inversión significativa en equipos y electricidad. No es una forma fácil de ganar dinero; infórmate bien antes de intentar minar."
  },
  {
    id: 7,
    title: "Ethereum y Smart Contracts",
    level: 3,
    levelName: "Avanzado",
    levelColor: "#3b82f6",
    duration: "40 min",
    icon: "⟠",
    description: "Conoce Ethereum, la plataforma que hizo posible los contratos inteligentes y la Web3. Entiende su ecosistema y cómo funciona.",
    topics: [
      {
        title: "¿Qué es Ethereum?",
        content: "Ethereum es más que una criptomoneda: es una plataforma descentralizada que permite crear aplicaciones (dApps) sobre blockchain. Fue propuesto en 2013 por Vitalik Buterin cuando tenía 19 años y lanzado en 2015. Mientras Bitcoin es principalmente dinero digital, Ethereum es como una computadora mundial donde cualquiera puede ejecutar programas que nadie puede censurar ni detener. Su moneda nativa, Ether (ETH), se usa para pagar por usar esa computadora mundial.",
        tip: "Si Bitcoin es dinero digital, Ethereum es una computadora digital. Ambos usan blockchain, pero con propósitos diferentes."
      },
      {
        title: "Smart contracts",
        content: "Los contratos inteligentes son programas que se ejecutan automáticamente cuando se cumplen condiciones predefinidas. Son como máquinas expendedoras: pones tu moneda, seleccionas tu producto, y la máquina te lo entrega sin necesidad de un vendedor. En cripto, un smart contract puede liberar un pago cuando se entrega un producto, distribuir fondos entre inversores según reglas fijas, o ejecutar cualquier acuerdo sin necesidad de intermediarios. Una vez desplegados en blockchain, no se pueden modificar.",
      },
      {
        title: "Gas y comisiones",
        content: "En Ethereum, cada operación cuesta 'gas', que se paga en ETH. El gas mide cuánto trabajo computacional requiere una acción. Una transferencia simple usa poco gas; un smart contract complejo usa mucho. El precio del gas varía según la demanda: cuando muchos quieren usar la red, el gas sube. Puedes elegir cuánto pagar por unidad de gas: si pagas más, tu transacción se procesa más rápido. Sitios como Etherscan Gas Tracker te muestran el precio actual del gas para que elijas el mejor momento.",
        tip: "Usa sitios como gastracker.io para ver cuándo el gas está más barato. Generalmente, madrugadas y fines de semana tienen menor demanda."
      },
      {
        title: "Tokens ERC-20 y ERC-721",
        content: "ERC-20 es el estándar para crear tokens en Ethereum. La mayoría de las criptomonedas que no son ETH son tokens ERC-20. Todos siguen las mismas reglas, lo que hace que funcionen con cualquier wallet o exchange compatible con Ethereum. ERC-721 es el estándar para NFTs (tokens no fungibles). A diferencia de los ERC-20 donde cada token es idéntico, cada ERC-721 es único y representa un activo digital distinto (arte, música, items de juego). Estos estándares permiten que todo el ecosistema Ethereum sea compatible entre sí.",
      }
    ],
    keyTerms: ["Smart contract", "dApp", "Gas", "ERC-20", "ERC-721", "Vitalik Buterin"],
    securityTip: "Los smart contracts no se pueden modificar una vez desplegados. Si tienen errores (bugs), pueden ser explotados por hackers. Siempre verifica los contratos con los que interactúas."
  },
  {
    id: 8,
    title: "Finanzas Descentralizadas (DeFi)",
    level: 3,
    levelName: "Avanzado",
    levelColor: "#3b82f6",
    duration: "45 min",
    icon: "🏦",
    description: "Explora el ecosistema DeFi: exchanges descentralizados, préstamos sin bancos y yield farming. Aprende los riesgos antes de participar.",
    topics: [
      {
        title: "¿Qué es DeFi?",
        content: "DeFi (Finanzas Descentralizadas) es un ecosistema de aplicaciones financieras construidas sobre blockchain que funcionan sin intermediarios tradicionales como bancos, corredores o aseguradoras. Con DeFi puedes hacer todo lo que haces en un banco: pedir préstamos, ganar intereses, cambiar monedas, y más. La diferencia es que lo haces directamente con otros usuarios a través de smart contracts. No hay horarios de oficina, no hay aprobaciones, y cualquier persona con internet puede participar.",
        tip: "DeFi es como tener un banco en tu bolsillo que nunca cierra y no necesita aprobaciones."
      },
      {
        title: "Exchanges descentralizados",
        content: "Los DEX (Decentralized Exchanges) permiten intercambiar criptomonedas sin un intermediario. A diferencia de exchanges centralizados como Binance, en un DEX tú mantienes el control de tus fondos en todo momento. Ejemplos populares: Uniswap, SushiSwap, PancakeSwap. Funcionan con 'pools de liquidez': usuarios depositan pares de monedas que otros pueden intercambiar. A cambio, los proveedores de liquidez ganan una parte de las comisiones. El precio se ajusta automáticamente según la oferta y demanda.",
      },
      {
        title: "Préstamos y yield farming",
        content: "En DeFi puedes prestar tus criptomonedas para ganar intereses (a menudo mayores que los bancos tradicionales) o pedir prestado usando tus criptomonedas como garantía. El yield farming va un paso más allá: consiste en prestar tus criptomonedas a diferentes protocolos DeFi para maximizar tus ganancias, moviéndolas entre plataformas según las mejores tasas. Los rendimientos pueden ser altos, pero los riesgos también: los smart contracts pueden tener vulnerabilidades y las tasas cambian constantemente.",
        tip: "Los rendimientos altos siempre vienen con riesgos altos. Si una plataforma ofrece 100% anual, pregunta: ¿de dónde sale ese dinero?"
      },
      {
        title: "Riesgos en DeFi",
        content: "Los riesgos principales en DeFi son: Riesgo de smart contract: errores en el código pueden ser explotados, perdiendo todos los fondos. Riesgo de impermanencia: al proveer liquidez, si el precio de las monedas cambia mucho, puedes terminar con menos valor del que invertiste. Riesgo de liquidación: si el valor de tu garantía baja, tus préstamos pueden ser liquidados automáticamente. Riesgo de proyecto: el equipo detrás de un protocolo puede desaparecer (rug pull). Siempre investiga: audítos de seguridad, equipo del proyecto, y comunidad activa.",
      }
    ],
    keyTerms: ["DeFi", "DEX", "Pool de liquidez", "Yield farming", "Liquidación", "Impermanencia"],
    securityTip: "Nunca inviertas en un protocolo DeFi que no haya sido auditado por empresas de seguridad reconocidas. Busca auditorías de CertiK, Trail of Bits o ConsenSys Diligence."
  },
  {
    id: 9,
    title: "NFTs y Tokens No Fungibles",
    level: 3,
    levelName: "Avanzado",
    levelColor: "#3b82f6",
    duration: "30 min",
    icon: "🎨",
    description: "Descubre qué son los NFTs, cómo funcionan, sus casos de uso reales y qué tener en cuenta antes de comprar o crear uno.",
    topics: [
      {
        title: "¿Qué es un NFT?",
        content: "NFT significa 'Non-Fungible Token' (Token No Fungible). Mientras que un Bitcoin es igual a otro Bitcoin (fungible), cada NFT es único e irrepetible. Un NFT es un certificado digital de propiedad registrado en blockchain que demuestra que tú eres el dueño de un activo digital específico. Puede representar arte, música, videos, items de videojuegos, o incluso bienes raíces virtuales. El valor de un NFT viene de su escasez, utilidad y la demanda de la comunidad.",
        tip: "Comprar un NFT de arte no necesariamente te da los derechos de autor. Verifica qué derechos incluye la compra."
      },
      {
        title: "Casos de uso reales",
        content: "Los NFTs tienen aplicaciones más allá del arte digital: Gaming: items y personajes que realmente te pertenecen y puedes vender. Ticketing: entradas a eventos que no se pueden falsificar. Identidad digital: credenciales y certificados verificables. Música: los artistas pueden vender su música directamente sin intermediarios. Bienes raíces: propiedades tokenizadas que se pueden comprar fraccionalmente. Coleccionables: tarjetas deportivas, memorabilia y más, con autenticidad verificable en blockchain.",
      },
      {
        title: "Estándares de tokens",
        content: "Los NFTs se crean siguiendo estándares técnicos: ERC-721 (Ethereum): el estándar original para NFTs. Cada token es único con sus propios metadatos. ERC-1155 (Ethereum): permite crear tanto tokens fungibles como no fungibles en un solo contrato. Más eficiente para juegos. Solana NFTs: estándar de Metaplex para la red Solana, con comisiones mucho más bajas. Los metadatos del NFT (nombre, descripción, imagen) se almacenan generalmente en IPFS, un sistema de almacenamiento descentralizado, no directamente en blockchain.",
      },
      {
        title: "Mercados de NFTs",
        content: "Los mercados (marketplaces) de NFTs son plataformas donde puedes comprar, vender y crear NFTs. Los más conocidos: OpenSea: el mercado más grande, con NFTs de muchas colecciones. Blur: enfocado en traders con herramientas avanzadas. Magic Eden: popular para NFTs en Solana y Bitcoin. Rarible: marketplace descentralizado. Antes de comprar, investiga: el historial de ventas, la comunidad del proyecto, si los creadores son verificables, y si el proyecto tiene utilidad real más allá de la especulación.",
      }
    ],
    keyTerms: ["NFT", "No fungible", "ERC-721", "ERC-1155", "IPFS", "Metadatos", "Mint"],
    securityTip: "Cuidado con las estafas de NFTs: proyectos que prometen beneficios futuros que nunca llegan, o NFTs 'gratis' que instalan malware al interactuar con ellos."
  },

  // ===== NIVEL 4: EXPERTO =====
  {
    id: 10,
    title: "El Futuro de Cripto",
    level: 4,
    levelName: "Experto",
    levelColor: "#a855f7",
    duration: "30 min",
    icon: "🚀",
    description: "Vislumbra el futuro: Web3, DAOs, metaverso cripto y las tecnologías que están definiendo la próxima era de internet.",
    topics: [
      {
        title: "Web3 y la internet descentralizada",
        content: "Web3 es la visión de una internet donde los usuarios tienen control sobre sus datos, identidad y dinero, sin depender de grandes corporaciones. En Web1 (1990s) solo leíamos contenido. En Web2 (2000s-presente) creamos y compartimos contenido, pero las plataformas (Google, Meta, Amazon) controlan nuestros datos y monetizan con ellos. En Web3, blockchain y cripto permiten que los usuarios sean dueños de sus activos digitales, participen en la gobernanza de las plataformas y sean recompensados por sus contribuciones.",
        tip: "Web3 aún está en construcción. Muchos proyectos fallarán, pero los que sobrevivan podrían cambiar cómo usamos internet."
      },
      {
        title: "DAOs (Organizaciones Autónomas Descentralizadas)",
        content: "Una DAO es una organización que funciona sin líderes tradicionales. Las reglas están programadas en smart contracts y los miembros votan las decisiones usando tokens. Ejemplos reales: MakerDAO (gestiona la stablecoin DAI con más de $7 mil millones en valor bloqueado), Uniswap DAO (gobernanza del exchange descentralizado), y ConstitutionDAO (grupo que intentó comprar una copia de la Constitución de EE.UU.). Las DAOs permiten que comunidades globales se coordinen y tomen decisiones sin necesidad de jerarquías tradicionales.",
      },
      {
        title: "Metaverso y cripto",
        content: "El metaverso es un mundo virtual donde las personas pueden interactuar, trabajar y socializar. Las criptomonedas y NFTs son la economía del metaverso: permiten comprar terrenos virtuales (como en The Sandbox o Decentraland), personalizar avatares con items únicos, asistir a eventos virtuales con entradas NFT, y comerciar bienes digitales. Aunque el metaverso aún está en etapas tempranas, marcas como Nike, Adidas y Samsung ya tienen presencia en estas plataformas virtuales.",
      },
      {
        title: "Tecnologías emergentes",
        content: "Varias tecnologías están moldeando el futuro cripto: Zero-Knowledge Proofs (ZKPs): permiten verificar información sin revelarla (como demostrar que tienes fondos sin mostrar cuánto). Abren camino a mayor privacidad y escalabilidad. Layer 2 solutions: redes como Arbitrum, Optimism y zkSync que procesan transacciones fuera de la blockchain principal, reduciendo costos y aumentando velocidad. Account Abstraction: wallets más inteligentes que pueden recuperar acceso perdido y automatizar operaciones. Cross-chain bridges: conectar diferentes blockchains para que puedan comunicarse entre sí.",
      }
    ],
    keyTerms: ["Web3", "DAO", "Metaverso", "Zero-Knowledge Proof", "Layer 2", "Account Abstraction"],
    securityTip: "Las tecnologías emergentes son emocionantes pero también las más riesgosas. Los proyectos nuevos tienen más probabilidad de fallar. Invierte solo lo que puedas perder."
  }
];

export const levelInfo = [
  { level: 1, name: "Principiante", color: "#22c55e", bgColor: "#16a34a20", icon: "🟢", description: "Fundamentos esenciales para empezar desde cero" },
  { level: 2, name: "Intermedio", color: "#eab308", bgColor: "#ca8a0420", icon: "🟡", description: "Herramientas y seguridad para moverte con confianza" },
  { level: 3, name: "Avanzado", color: "#3b82f6", bgColor: "#2563eb20", icon: "🔵", description: "Conocimiento profundo del ecosistema cripto" },
  { level: 4, name: "Experto", color: "#a855f7", bgColor: "#9333ea20", icon: "🜨", description: "El futuro: Web3, DAOs y tecnologías emergentes" },
];

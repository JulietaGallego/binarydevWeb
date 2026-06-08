// src/data/quiz.ts
// Data tipada del quiz diagnóstico de BinaryDev.
// Para editar preguntas, opciones o resultados, sólo tocás este archivo.

// ─── TIPOS ─────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  label: string;
  detail: string;
}

export interface QuizStep {
  title: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizResult {
  service: string;
  title: string;
  desc: string;
}

// Claves válidas de paso 1
export type S1Key = "1.a" | "1.b" | "1.c" | "1.d";

// Mapa de steps: paso 1 siempre es "s1"; pasos 2 y 3 dependen de s1
export type StepKey =
  | "s1"
  | `s2-${S1Key}`
  | `s3-${S1Key}`;

// Clave de resultado: combinación de las tres selecciones
export type ResultKey = `${string}-${string}-${string}`;

// ─── PASO 1 — igual para todos ─────────────────────────────────────────────

const step1: QuizStep = {
  title: "¿Qué necesitás resolver primero?",
  subtitle: "Elegí el objetivo que mejor describe tu situación actual.",
  options: [
    {
      id: "1.a",
      label: "Necesito una web profesional para mi negocio.",
      detail:
        "Una web formal y profesional para explicar bien qué hacés, dar confianza a tus clientes y centralizar las consultas en un solo lugar.",
    },
    {
      id: "1.b",
      label: "Quiero vender online de forma automática.",
      detail:
        "Tu catálogo online para que los clientes elijan, vean el stock real y paguen solos, sin que tengas que intervenir en cada venta.",
    },
    {
      id: "1.c",
      label: "Tengo una web pero no está dando resultados.",
      detail:
        "Ya tenés un sitio, pero es lento, no genera consultas, los usuarios entran y se van, o no tenés datos de lo que pasa adentro.",
    },
    {
      id: "1.d",
      label: "Quiero automatizar tareas repetitivas.",
      detail:
        "Perdés horas pasando datos a mano, armando presupuestos o respondiendo lo mismo por WhatsApp en vez de enfocarte en crecer.",
    },
  ],
};

// ─── PASOS 2 Y 3 — por rama ────────────────────────────────────────────────

const stepsByKey: Record<StepKey, QuizStep> = {
  s1: step1,

  // ── Rama A: Web institucional ──────────────────────────────────────────

  "s2-1.a": {
    title: "¿Cómo es tu presencia online actual?",
    options: [
      {
        id: "2.a1",
        label: "No tengo un sitio web.",
        detail:
          "Mi negocio todavía no figura en internet de manera oficial. Necesito un desarrollo desde cero.",
      },
      {
        id: "2.a2",
        label: "Tengo una web desactualizada.",
        detail:
          "La web quedó obsoleta visualmente o no es adaptable a celulares.",
      },
      {
        id: "2.a3",
        label: "Tengo solo redes sociales.",
        detail:
          "Uso perfiles comerciales pero necesito un dominio propio con contenido y mayor credibilidad.",
      },
    ],
  },

  "s3-1.a": {
    title: "¿Qué información es clave mostrar en tu nueva web?",
    options: [
      {
        id: "3.a1",
        label: "Mis servicios en detalle y la historia de la empresa.",
        detail:
          "Es fundamental enfocar el sitio en la propuesta de valor y trayectoria.",
      },
      {
        id: "3.a2",
        label: "Un catálogo organizado de productos (sin venta online).",
        detail:
          "Necesito mostrar el stock disponible de forma clara pero sin pasarela de pagos.",
      },
      {
        id: "3.a3",
        label: "Todo lo anterior junto.",
        detail:
          "Busco un portal corporativo completo con secciones de servicios y muestrario.",
      },
    ],
  },

  // ── Rama B: E-commerce ────────────────────────────────────────────────

  "s2-1.b": {
    title: "¿Cómo vendés tus productos hoy?",
    options: [
      {
        id: "2.b1",
        label: "Por local a la calle o showroom.",
        detail:
          "La atención y el proceso de cobro se hacen de forma 100% presencial.",
      },
      {
        id: "2.b2",
        label: "Por WhatsApp y redes sociales.",
        detail:
          "Mostrás fotos online pero coordinás el pago y el envío manualmente por chat.",
      },
      {
        id: "2.b3",
        label: "Es un proyecto nuevo.",
        detail:
          "Estás lanzando la marca desde cero y querés arrancar directo de forma digital.",
      },
    ],
  },

  "s3-1.b": {
    title: "¿Qué herramientas necesitás que tenga tu tienda online?",
    options: [
      {
        id: "3.b1",
        label: "Catálogo y carrito de compras básico.",
        detail:
          "Ideal para recibir pedidos o presupuestos online sin automatizar todo el proceso.",
      },
      {
        id: "3.b2",
        label: "Carrito, control de stock y pasarelas de pago integradas.",
        detail:
          "Automatización total de la transacción mediante tarjetas o transferencias.",
      },
      {
        id: "3.b3",
        label: "Solución completa con logística y stock en tiempo real.",
        detail:
          "Una plataforma robusta con pasarelas de pago, gestión de envíos y sincronización de inventario.",
      },
    ],
  },

  // ── Rama C: Auditoría / Mejora ────────────────────────────────────────

  "s2-1.c": {
    title: "¿Cuál es el principal problema que detectás en tu web actual?",
    options: [
      {
        id: "2.c1",
        label: "La web tiene problemas técnicos o de diseño.",
        detail:
          "La página se ve vieja, tarda mucho en cargar o tiene errores de diseño.",
      },
      {
        id: "2.c2",
        label: "No sé qué está pasando en mi web.",
        detail:
          "No sé cuánta gente entra ni tengo métricas instaladas para medirlo.",
      },
      {
        id: "2.c3",
        label: "Recibo pocas consultas o conversiones.",
        detail:
          "La gente ingresa pero se va sin completar ningún formulario ni acción.",
      },
    ],
  },

  "s3-1.c": {
    title: "¿Qué camino preferís tomar con tu plataforma actual?",
    options: [
      {
        id: "3.c1",
        label: "Revisar lo que hay, medir errores y optimizarlo.",
        detail:
          "Quiero rescatar la estructura existente solucionando sus puntos débiles.",
      },
      {
        id: "3.c2",
        label: "Hacer borrón y cuenta nueva: arrancar de cero.",
        detail:
          "Prefiero rediseñar por completo la plataforma usando tecnologías modernas.",
      },
      {
        id: "3.c3",
        label: "No estoy seguro, necesito el diagnóstico de un profesional.",
        detail:
          "Busco una auditoría técnica preliminar para tomar la mejor decisión económica.",
      },
    ],
  },

  // ── Rama D: Automatización ────────────────────────────────────────────

  "s2-1.d": {
    title: "¿Cuál es la tarea manual que más tiempo te quita?",
    options: [
      {
        id: "2.d1",
        label: "Pasar datos entre plataformas a mano.",
        detail:
          "Copiar información entre facturación, planillas de Excel, stock o CRM.",
      },
      {
        id: "2.d2",
        label: "Responder preguntas repetitivas.",
        detail:
          "Enviar siempre los mismos mensajes de soporte, precios o condiciones por WhatsApp.",
      },
      {
        id: "2.d3",
        label: "Armar presupuestos de forma artesanal.",
        detail:
          "Calcular costos y redactar propuestas personalizadas desde cero para cada cliente.",
      },
    ],
  },

  "s3-1.d": {
    title: "¿Qué impacto inmediato buscás al implementar esta automatización?",
    options: [
      {
        id: "3.d1",
        label: "Reducir radicalmente el tiempo operativo.",
        detail:
          "Eliminar la carga manual de datos duplicados y liberar horas de trabajo administrativo diario.",
      },
      {
        id: "3.d2",
        label: "Evitar errores humanos y pérdidas de información.",
        detail:
          "Sincronizar sistemas de forma precisa para que no se caigan ventas ni queden mensajes sin responder.",
      },
      {
        id: "3.d3",
        label: "Escalar el volumen de operaciones actual.",
        detail:
          "Preparar la infraestructura interna para procesar el triple de solicitudes sin colapsar.",
      },
    ],
  },
};

// ─── RESULTADOS — 36 combinaciones ─────────────────────────────────────────
// Clave: "${s1}-${s2}-${s3}"

const resultsByKey: Record<string, QuizResult> = {

  // ── Rama A ──────────────────────────────────────────────────────────────

  "1.a-2.a1-3.a1": {
    service: "Sitio Web Institucional",
    title: "Necesitás un sitio web profesional desde cero",
    desc: "Desarrollamos tu primera presencia web centrada en transmitir quién sos, qué hacés y por qué elegirte. Con secciones de servicios, historia y un formulario de contacto optimizado para captar consultas.",
  },
  "1.a-2.a1-3.a2": {
    service: "Sitio Web Institucional",
    title: "Necesitás un sitio web con muestrario de productos",
    desc: "Creamos tu primera web con un catálogo visual organizado por categorías. Tus clientes podrán explorar el stock disponible de forma clara, sin pasarela de pagos, y contactarte directamente desde la plataforma.",
  },
  "1.a-2.a1-3.a3": {
    service: "Sitio Web Institucional",
    title: "Necesitás un portal corporativo completo desde cero",
    desc: "Construimos una web integral que combina presentación institucional con catálogo de productos. Una plataforma profesional que centraliza todo: quiénes son, qué ofrecen y qué tienen disponible.",
  },
  "1.a-2.a2-3.a1": {
    service: "Rediseño Web",
    title: "Tu web necesita un rediseño enfocado en servicios",
    desc: "Modernizamos tu sitio actual con diseño responsive y una arquitectura de contenido que comunique tu propuesta de valor y trayectoria de forma clara. Tus clientes van a encontrar lo que buscan en segundos.",
  },
  "1.a-2.a2-3.a2": {
    service: "Rediseño Web",
    title: "Tu web necesita un rediseño con catálogo actualizado",
    desc: "Renovamos la plataforma con diseño moderno y adaptable, incorporando un muestrario de productos organizado y fácil de navegar. Sin pasarela de pagos, pero con toda la información que tu cliente necesita ver.",
  },
  "1.a-2.a2-3.a3": {
    service: "Rediseño Web",
    title: "Tu web necesita un rediseño corporativo completo",
    desc: "Reconstruimos tu sitio con identidad visual actualizada, secciones institucionales bien definidas y un catálogo de productos integrado. Un portal moderno que reemplaza lo viejo con algo que realmente funciona.",
  },
  "1.a-2.a3-3.a1": {
    service: "Sitio Web Institucional",
    title: "Es hora de tener una web propia centrada en tus servicios",
    desc: "Pasamos tus redes a una web con dominio propio que jerarquiza tu propuesta de valor, explica tus servicios en profundidad y genera confianza real. Un canal que vos controlás y que nunca cambia el algoritmo.",
  },
  "1.a-2.a3-3.a2": {
    service: "Sitio Web Institucional",
    title: "Es hora de tener una web propia con tu catálogo",
    desc: "Creamos un sitio con dominio propio donde tus productos tienen su espacio organizado y profesional. Tus clientes dejan de depender de tu feed de Instagram para ver qué tenés disponible.",
  },
  "1.a-2.a3-3.a3": {
    service: "Sitio Web Institucional",
    title: "Es hora de un portal propio que reemplace tus redes",
    desc: "Desarrollamos una web completa con identidad institucional y catálogo de productos integrado. Tu negocio deja de depender de plataformas de terceros y pasa a tener una casa digital propia y profesional.",
  },

  // ── Rama B ──────────────────────────────────────────────────────────────

  "1.b-2.b1-3.b1": {
    service: "Tienda Online",
    title: "Necesitás extender tu local al canal digital con un catálogo online",
    desc: "Creamos una tienda donde tus clientes pueden explorar productos y hacer pedidos online que vos confirmás manualmente. El primer paso para digitalizar las ventas sin abandonar tu proceso actual.",
  },
  "1.b-2.b1-3.b2": {
    service: "Tienda Online",
    title: "Necesitás una tienda que sincronice tu local con el canal digital",
    desc: "Desarrollamos una tienda online integrada con tu stock físico y pasarela de pagos. Tus clientes compran y pagan solos, y vos gestionás todo desde un mismo panel sin duplicar tareas.",
  },
  "1.b-2.b1-3.b3": {
    service: "Tienda Online",
    title: "Necesitás una solución que unifique tu local, stock y logística",
    desc: "Desarrollamos una plataforma de e-commerce robusta que sincroniza el inventario de tu local con las ventas online, integra pasarelas de pago y automatiza la gestión de envíos desde un solo lugar.",
  },
  "1.b-2.b2-3.b1": {
    service: "Tienda Online",
    title: "Necesitás una tienda que reemplace el caos del WhatsApp",
    desc: "Creamos un catálogo online donde tus clientes ven productos, precios y disponibilidad en tiempo real. Vos seguís confirmando los pedidos, pero sin el ida y vuelta manual de siempre.",
  },
  "1.b-2.b2-3.b2": {
    service: "Tienda Online",
    title: "Necesitás una tienda que automatice lo que hoy hacés por WhatsApp",
    desc: "Desarrollamos una tienda con carrito, control de stock y cobro integrado. Tus clientes completan la compra solos, y vos sólo te encargás de preparar y despachar el pedido.",
  },
  "1.b-2.b2-3.b3": {
    service: "Tienda Online",
    title: "Necesitás reemplazar el WhatsApp con una operación de e-commerce real",
    desc: "Creamos una plataforma completa que centraliza catálogo, stock, pagos y envíos. Del chat manual a un negocio digital que opera solo, escala y te deja enfocarte en lo que importa.",
  },
  "1.b-2.b3-3.b1": {
    service: "Tienda Online",
    title: "Necesitás lanzar tu marca con una tienda para recibir pedidos",
    desc: "Arrancamos tu e-commerce con un catálogo organizado y sistema de pedidos online. Una base sólida para validar tu propuesta y empezar a vender sin invertir en infraestructura compleja.",
  },
  "1.b-2.b3-3.b2": {
    service: "Tienda Online",
    title: "Necesitás lanzar tu marca con una tienda que cobre sola",
    desc: "Desarrollamos tu tienda desde cero con carrito, stock en tiempo real y pasarela de pagos integrada. Arrancás tu negocio digital con todo lo necesario para vender y cobrar sin intervención manual.",
  },
  "1.b-2.b3-3.b3": {
    service: "Tienda Online",
    title: "Necesitás lanzar tu marca con una plataforma de e-commerce completa",
    desc: "Construimos tu tienda con la infraestructura completa desde el día uno: catálogo, stock, pagos y logística integrados. Arrancás con una operación lista para escalar desde el primer pedido.",
  },

  // ── Rama C ──────────────────────────────────────────────────────────────

  "1.c-2.c1-3.c1": {
    service: "Auditoría Web",
    title: "Tu web necesita una auditoría técnica para optimizarla",
    desc: "Analizamos los problemas de diseño y performance de tu sitio actual y te entregamos un plan de mejora concreto. Rescatamos la estructura existente, corregimos lo que falla y medimos el impacto.",
  },
  "1.c-2.c1-3.c2": {
    service: "Rediseño Web",
    title: "Tu web con problemas técnicos necesita un rediseño completo",
    desc: "Los errores acumulados son la señal de que es momento de empezar de cero. Rediseñamos tu plataforma desde los cimientos con tecnología moderna, rendimiento optimizado y diseño que convierte.",
  },
  "1.c-2.c1-3.c3": {
    service: "Auditoría Web",
    title: "Primero necesitás un diagnóstico para saber si optimizar o rediseñar",
    desc: "Hacemos una auditoría técnica y visual completa de tu sitio. Te entregamos un informe claro que te dice exactamente qué está fallando y cuál es el camino más inteligente económicamente: mejorar o rehacer.",
  },
  "1.c-2.c2-3.c1": {
    service: "Auditoría Web",
    title: "Tu web necesita métricas y una auditoría para optimizarla",
    desc: "Instalamos herramientas de análisis, interpretamos qué está pasando con tus usuarios y te damos un plan de mejora basado en datos reales. Dejás de operar a ciegas y empezás a tomar decisiones informadas.",
  },
  "1.c-2.c2-3.c2": {
    service: "Rediseño Web",
    title: "Si no sabés qué pasa en tu web, es momento de empezar de cero",
    desc: "Rediseñamos tu plataforma con analítica integrada desde el primer día. Nuevo diseño, nueva arquitectura y métricas configuradas para que nunca más operes sin saber qué está pasando.",
  },
  "1.c-2.c2-3.c3": {
    service: "Auditoría Web",
    title: "Necesitás una auditoría que te diga qué está pasando en tu web",
    desc: "Revisamos tu plataforma en profundidad: instalamos métricas, analizamos el comportamiento de tus usuarios y te entregamos un diagnóstico claro con las acciones prioritarias a tomar.",
  },
  "1.c-2.c3-3.c1": {
    service: "Auditoría Web",
    title: "Tu web con pocas conversiones necesita una auditoría de optimización",
    desc: "Analizamos por qué tus visitantes se van sin convertir y te entregamos un plan de optimización concreto. Mejoramos calls to action, estructura de contenido y velocidad para que cada visita cuente más.",
  },
  "1.c-2.c3-3.c2": {
    service: "Rediseño Web",
    title: "Tu web que no convierte necesita un rediseño orientado a resultados",
    desc: "Rediseñamos tu sitio desde cero con un enfoque en conversión: arquitectura de contenido estratégica, llamados a la acción claros y experiencia de usuario diseñada para transformar visitas en clientes.",
  },
  "1.c-2.c3-3.c3": {
    service: "Auditoría Web",
    title: "Antes de invertir, necesitás un diagnóstico profesional de tu web",
    desc: "Hacemos una auditoría de conversión completa: revisamos por qué tus visitantes no están completando las acciones esperadas y te damos un informe con las soluciones ordenadas por impacto y costo.",
  },

  // ── Rama D ──────────────────────────────────────────────────────────────

  "1.d-2.d1-3.d1": {
    service: "Automatización de Procesos",
    title: "Necesitás eliminar el traslado manual de datos entre sistemas",
    desc: "Conectamos tus plataformas (facturación, Excel, CRM, stock) para que los datos fluyan solos. Eliminamos las horas de carga manual y reducís drásticamente el tiempo operativo de tu equipo.",
  },
  "1.d-2.d1-3.d2": {
    service: "Automatización de Procesos",
    title: "Necesitás sincronizar tus sistemas para eliminar errores de datos",
    desc: "Integramos tus plataformas con sincronización precisa y en tiempo real. Los datos nunca se pierden ni se duplican, las ventas no se caen por errores de stock y tu operación gana consistencia.",
  },
  "1.d-2.d1-3.d3": {
    service: "Automatización de Procesos",
    title: "Necesitás una integración de sistemas que escale con tu negocio",
    desc: "Diseñamos una arquitectura de integración que conecta todas tus plataformas y está preparada para crecer. Tu operación puede multiplicarse sin multiplicar el trabajo manual de tu equipo.",
  },
  "1.d-2.d2-3.d1": {
    service: "Automatización de Procesos",
    title: "Necesitás automatizar las respuestas repetitivas para liberar tiempo",
    desc: "Implementamos flujos automáticos de respuesta para preguntas frecuentes vía WhatsApp o email. Tu equipo deja de responder lo mismo una y otra vez y recupera horas para tareas de mayor valor.",
  },
  "1.d-2.d2-3.d2": {
    service: "Automatización de Procesos",
    title: "Necesitás automatizar respuestas para no perder consultas por demoras",
    desc: "Configuramos respuestas automáticas inteligentes que atienden consultas al instante, sin errores ni olvidos. Ninguna consulta queda sin responder y tu equipo se enfoca en cerrar, no en atender.",
  },
  "1.d-2.d2-3.d3": {
    service: "Automatización de Procesos",
    title: "Necesitás escalar la atención automática sin sumar personal",
    desc: "Implementamos flujos de atención automatizados que responden, filtran y derivan consultas según su tipo. Triplicás el volumen de atención sin contratar más gente ni ampliar la jornada.",
  },
  "1.d-2.d3-3.d1": {
    service: "Automatización de Procesos",
    title: "Necesitás automatizar la generación de presupuestos para ahorrar tiempo",
    desc: "Creamos un sistema que genera presupuestos automáticamente a partir de parámetros definidos. Tu equipo deja de redactar propuestas desde cero y puede responder consultas en minutos, no en horas.",
  },
  "1.d-2.d3-3.d2": {
    service: "Automatización de Procesos",
    title: "Necesitás automatizar presupuestos para eliminar errores de cálculo",
    desc: "Implementamos un generador de propuestas que calcula costos y arma el documento automáticamente. Sin errores manuales, sin versiones desactualizadas y con toda la información siempre consistente.",
  },
  "1.d-2.d3-3.d3": {
    service: "Automatización de Procesos",
    title: "Necesitás escalar tu capacidad de presupuestar sin más recursos",
    desc: "Diseñamos un sistema de generación automática de presupuestos que permite responder el triple de consultas en el mismo tiempo. Tu operación comercial crece sin que crezca la carga de trabajo.",
  },
};

// ─── EXPORTS ───────────────────────────────────────────────────────────────

export const TOTAL_STEPS = 3;

/**
 * Devuelve el step correspondiente según el paso actual y la selección del paso 1.
 */
export function getStep(step: number, s1?: string): QuizStep {
  if (step === 1) return stepsByKey["s1"];
  const key = `s${step}-${s1}` as StepKey;
  return stepsByKey[key];
}

/**
 * Devuelve el resultado para una combinación de selecciones.
 * Si la clave no existe (no debería), devuelve un fallback genérico.
 */
export function getResult(s1: string, s2: string, s3: string): QuizResult {
  const key = `${s1}-${s2}-${s3}`;
  return (
    resultsByKey[key] ?? {
      service: "Consultoría Digital",
      title: "Necesitás una evaluación personalizada",
      desc: "Tu situación tiene características particulares. Te recomendamos una consulta inicial para definir el mejor camino juntos.",
    }
  );
}

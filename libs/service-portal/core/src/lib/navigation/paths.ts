export enum ServicePortalPath {
  // Mínar síður
  MinarSidurRoot = '/',
  MinarSidurSignInOidc = '/signin-oidc',
  MinarSidurSilentSignInOidc = '/silent/signin-oidc',
  // Umsoknir
  UmsoknirRoot = '/umsoknir',
  UmsoknirNyUmsokn = '/umsoknir/ny-umsokn',
  UmsoknirOpnarUmsoknir = '/umsoknir/opnar-umsoknir',
  UmsoknirLyfsedlar = '/umsoknir/lyfsedlar',
  JudicialCreateDetentionPoc = '/stofna-krofu/grunnupplysingar',
  JudicialDetentionRequestsPoc = '/gaesluvardhaldskrofur',
  // Stillingar
  StillingarRoot = '/stillingar',
  StillingarUmbod = '/stillingar/umbod',
  // Fjolskyldan
  FjolskyldanRoot = '/fjolskyldan',
  MinarUpplysingar = '/minar-upplysingar',
  // Fjarmal
  FjarmalRoot = '/fjarmal',
  FjarmalOkutaeki = 'https://mitt.samgongustofa.is/',
  // Rafræn skjöl
  RafraenSkjolRoot = '/rafraen-skjol',
  // Heilsa
  HeilsaRoot = '/heilsa',
  HeilsaHeilsuvera = 'https://minarsidur.heilsuvera.is/heimasvaedi',
  HeilsaBolusetningar = 'https://minarsidur.heilsuvera.is/bolusetningar/bolusett-gegn/',
  // Menntun
  MenntunRoot = '/menntun',
}

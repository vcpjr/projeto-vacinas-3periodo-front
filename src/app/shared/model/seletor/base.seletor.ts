export abstract class BaseSeletor {
  public readonly TAMANHO_PAGINA: number = 5;
  limite: number = this.TAMANHO_PAGINA;
  pagina: number;
}

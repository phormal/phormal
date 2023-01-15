import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";
import {ValidationHelper} from "../util/validation-helper";

type useUrlOptions = {
  allowedProtocols?: string[];
  allowedHosts?: string[];
}

export const useUrl = (options?: useUrlOptions): HookReturnValue => {
  const URL_ERROR = 'url';
  const HOST_ERROR = 'url_host';
  const PROTOCOL_ERROR = 'url_protocol';

  const testIfValidURL = (field: FormField) => {
    const currentValue = field.getValue() as string
    let url: URL|undefined = undefined;

    try {
      url = new URL(currentValue);
      // eslint-disable-next-line no-empty
    } catch (_) {}

    const isValidUrl = url !== undefined;
    ValidationHelper.pushOrSpliceError(field, URL_ERROR, isValidUrl)

    return url
  }

  const testIfValidHost = (field: FormField, url: URL) => {
    const isValidHost = options!.allowedHosts!.includes(url.host)
    ValidationHelper.pushOrSpliceError(field, HOST_ERROR, isValidHost)
  }

  const testIfValidProtocol = (field: FormField, url: URL) => {
    // Allow users to enter the faulty protocol without the colon
    const processedAllowedProtocols = options!.allowedProtocols!.map(protocol => {
      if (!protocol.endsWith(':')) return `${protocol}:`

      return protocol
    })
    const isValidProtocol = processedAllowedProtocols.includes(url.protocol)
    ValidationHelper.pushOrSpliceError(field, PROTOCOL_ERROR, isValidProtocol)
  }

  return {
    validators: {
      checkUrl(field: FormField) {
        const url = testIfValidURL(field)

        if (typeof url === 'undefined') return

        if (options?.allowedHosts) testIfValidHost(field, url)
        if (options?.allowedProtocols) testIfValidProtocol(field, url)
      }
    },

    errorMessages: {
      [URL_ERROR]: {
        en: 'Not a valid URL',
        ru: 'Недействительный URL',
        es: 'URL no válida',
        tr: 'Geçerli bir URL değil',
        // fa: '',
        fr: 'Pas une URL valide',
        de: 'Dies ist keine gültige URL',
        ja: '有効なURLではありません',
        it: 'URL non valido',
        pt: 'Não é um URL válido',
        zh: '不是一个有效的URL',
        vi: 'URL không hợp lệ',
      },
      [HOST_ERROR]: {
        en: `The URL host is not valid. Allowed hosts are: ${options?.allowedHosts?.join(', ')}`,
        ru: `URL хоста недействителен. Допустимыми хостами являются: ${options?.allowedHosts?.join(', ')}.`,
        es: `La URL host no es válida. Los hosts permitidos son: ${options?.allowedHosts?.join(', ')}`,
        tr: `URL ana bilgisayarı geçerli değil. İzin verilen ana bilgisayarlar şunlardır: ${options?.allowedHosts?.join(', ')}`,
        // fa: '',
        fr: `L'hôte de l'URL n'est pas valide. Les hôtes autorisés sont : ${options ?.allowedHosts ?.join(', ')}`,
        de: `Der URL-Host ist nicht gültig. Erlaubte Hosts sind: ${options?.allowedHosts?.join(', ')}`,
        ja: `URLのホストが有効ではありません。許可されたホストは ${options?.allowedHosts?.join(', ')} です。`,
        it: `L'host dell'URL non è valido. Gli host consentiti sono: ${options?.allowedHosts?.join(', ')}`,
        pt: `O hospedeiro URL não é válido. Os hospedeiros permitidos são: ${options?.allowedHosts?.join(', ')}`,
        zh: `URL主机是无效的。允许的主机是。${options?.allowedHosts?.join(', ')}。`,
        vi: `Máy chủ URL không hợp lệ. Máy chủ được phép là: ${options?.allowedHosts?.join(', ')}`,
      },
      [PROTOCOL_ERROR]: {
        en: `The URL protocol is not valid. Allowed protocols are: ${options?.allowedProtocols?.join(', ')}`,
        ru: `Протокол URL недействителен. Допустимыми протоколами являются: ${options?.allowedProtocols?.join(', ')}.`,
        es: `El protocolo URL no es válido. Los protocolos permitidos son: ${options?.allowedProtocols?.join(', ')}`,
        tr: `URL protokolü geçerli değil. İzin verilen protokoller şunlardır: ${options?.allowedProtocols?.join(', ')}`,
        // fa: '',
        fr: `Le protocole de l'URL n'est pas valide. Les protocoles autorisés sont : ${options ?.allowedProtocols ?.join(', ')}`,
        de: `Das URL-Protokoll ist nicht gültig. Erlaubte Protokolle sind: ${options?.allowedProtocols?.join(', ')}`,
        ja: `URLプロトコルが無効です。許可されたプロトコルは次のとおりです。${options?.allowedProtocols?.join(', ')} です。`,
        it: `Il protocollo URL non è valido. I protocolli consentiti sono: ${options?.allowedProtocols?.join(', ')}`,
        pt: `O protocolo URL não é válido. Os protocolos permitidos são: ${options?.allowedProtocols?.join(', ')}`,
        zh: `URL协议是无效的。允许的协议是。${options?.allowedProtocols?.join(', ')}。`,
        vi: `Giao thức URL không hợp lệ. Các giao thức được phép là: ${options?.allowedProtocols?.join(', ')}`,
      },
    }
  }
}

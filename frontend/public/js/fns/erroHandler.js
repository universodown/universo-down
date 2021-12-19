export default function erroHandler(err) {
    switch (err) {
      case 0:
        return alert("Servidor OffLine!");
        break;
      case 200:
        return alert("Não Encontrado!");
        break;
      case 304:
        return alert("Sem Alteração!");
        break;
      case 400:
        return alert("Estrutura de requisição inválida!");
        break;
      case 401:
        return alert("Usuário não possui permissão para esta ação!");
        break;
      case 404:
        return alert("Por favor, verifique os dados e tente novamente!");
        break;
      case 500:
        return alert("O servidor encontrou uma situação com a qual não sabe lidar!");
        break;
      default:
        return alert("Erro Desconhecido: " + err);
    }
  }
import { Type, TypeKind } from '@models';
import { defineImports, sharedTemplate } from '@templates';
import { InterfaceHistory } from 'src/models/history.models';

class HistoryConstructor {
  private interfaces: InterfaceHistory[] = [];

  // registerInterface(type: Type): void {
  //   const interface: InterfaceHistory = {
  //     name: type.name,
  //     fields: type.fields.map((field) => ({

  //     }))
  //   }
  // }
}

export const HistoryStore = new HistoryConstructor();

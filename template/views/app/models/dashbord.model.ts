import { Actions, Context } from "../helpers/context";
import { IFolderStruct } from "../../../app/metadata";
import { CoreService } from "../providers/core.service";

interface IDashboardState {
  loading: boolean;
  folders: IFolderStruct;
}

@Context()
export class DashboardContext extends Actions<IDashboardState> {
  protected readonly initial: IDashboardState = {
    loading: true,
    folders: {
      loaded: false,
      exist: true,
      path: "",
      files: [],
      folders: []
    }
  };

  constructor(private core: CoreService) {
    super();
  }

  public async init() {
    this.update({ loading: true });
    const folders = await this.core.dashboardFetch();
    this.update({ folders });
    this.update({ loading: false });
  }

  public async initAppRoot() {
    await this.core.dashboardInit();
  }

  public resetLoading(loading = false) {
    this.update({ loading });
  }

  public async referesh() {
    const newData = await this.core.dashboardFetch();
    this.update({ folders: newData });
  }

  public async loadPart(currentRef: IFolderStruct) {
    const newData = await this.core.dashboardFetch(currentRef.path);
    currentRef.files = newData.files;
    currentRef.folders = newData.folders;
    currentRef.loaded = true;
  }

  public async copyFileToFolder(source: string, target: string) {
    await this.core.copyFile({ sourcePath: source, targetPath: target });
  }
}

import { LongTile, LongTileContent, LongTileDetail } from "./styled/Tiles";
import { Eye, UserCircle } from "@phosphor-icons/react";
import { ContentHeader, ShortDescription } from "./styled/Text";

export function FriendTile() {
  return (
    <LongTile>
      <LongTileContent>
        <div className="">
          {/* <Avatar className="text-white" size={26} /> */}
          <UserCircle size={46} weight="light" />
        </div>
        <div className="ml-3">
          <ContentHeader>asd</ContentHeader>
          <ShortDescription>asdasd</ShortDescription>
        </div>
      </LongTileContent>
      <LongTileDetail>
        <Eye size={32} />
        {/* IF friend allowed inview to his progress then opened eye should be dispalyed, otherwise close */}
        {/* <EyeSlash size={32} /> */}
      </LongTileDetail>
    </LongTile>
  );
}

import Orphanage from "../models/Orphanage";
import ImagesView from "./ImageView";
export default {
  render(orphange: Orphanage) {
    return {
      id: orphange.id,
      name: orphange.name,
      latitude: orphange.latitude,
      longitude: orphange.longitude,
      about: orphange.about,
      instructions: orphange.instructions,
      opening_hours: orphange.opening_hours,
      open_on_weekends: orphange.open_on_weekends,
      images: ImagesView.renderMany(orphange.images),
    };
  },
  renderMany(orphanges: Orphanage[]) {
    return orphanges.map((orphange) => this.render(orphange));
  },
};

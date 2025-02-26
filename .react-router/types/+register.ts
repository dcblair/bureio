import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/api/s3-signed-url": {};
  "/api/s3-song": {};
  "/dsii": {};
};
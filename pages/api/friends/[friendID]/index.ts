import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"
import { createFriendPairing } from "../../../../utility/helper"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let friendID = req.query.friendID as string
  let user = firebaseAuth.currentUser
  if (req.method !== "DELETE") {
    res.status(400).send("This endpoint does not exist")
  } else if (user === null) {
    res.status(400).send("User does not exist")
  } else {
    await firebaseAdmin
      .firestore()
      .collection("Friends")
      .doc(createFriendPairing(user.uid, friendID))
      .delete()
      .then((value) => {
        res.status(200).send({})
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  }
}

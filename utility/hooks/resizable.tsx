import React from "react"
import Widget from "../../components/Widget"
import { StoredLocation } from "../types/trip"
import { useLocalStorage } from "react-use-storage"
interface Resizable {
  doIncreaseSize: (key: string) => void
  doDecreaseSize: (key: string) => void
  getSize: (key: string) => number
  handleItemUpdate: (dashboardItem: Array<string>) => void
  readLayout: (layout: Array<StoredLocation>) => void
  resizable: ResizableUseState

  getWidget: (key: string) => React.ReactNode
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void
}

const ResizableContext = React.createContext<Resizable | null>(null)

export function useResizable() {
  const context = React.useContext(ResizableContext)

  if (!context) {
    throw Error("useDashboardContent must be used within an AuthProvider")
  }
  return context
}

type ResizableUseState = {
  size: Map<string, number>
  order: Array<string>
  widgets: Map<string, React.ReactNode>
}

export function ResizableProvider({ children }: { children: React.ReactNode }) {
  const [resizable, setResizable] = React.useState<ResizableUseState>({
    size: new Map<string, number>(),
    order: [],
    widgets: new Map<string, React.ReactNode>(),
  })
  const [localLayout, setLocalLayout, removeLocalLayout] = useLocalStorage<Array<StoredLocation>>(
    "localLayout",
    [],
  )
  const sizes = [3, 5, 8, 12]
  React.useEffect(() => {
    setLocalLayout(getStorableLayout())
  }, [resizable.size, resizable.order])
  function updateOrder(order: Array<string>) {
    setResizable({
      ...resizable,
      order: order,
    })
  }

  function getWidget(key: string) {
    return resizable.widgets.get(key)
  }

  function readLayout(layout: Array<StoredLocation>) {
    let size = new Map<string, number>()
    let widgets = new Map<string, React.ReactNode>()
    let order: Array<string> = []
    layout.map((item) => {
      size.set(item.key, item.size)
      order.push(item.key)
      widgets.set(item.key, <Widget key={item.key} widget={{ key: item.key }} />)
    })

    setResizable({
      size: size,
      order: order,
      widgets: widgets,
    })
  }

  function getStorableLayout() {
    let layout: Array<StoredLocation> = []

    resizable.order.map((key) => {
      layout.push({
        key: key,
        size: resizable.size.get(key) ?? 0,
      })
    })

    return layout
  }

  // TODO: Have function to add widgets
  function handleItemUpdate(dashboardItem: Array<string>) {
    let map = new Map(resizable?.size)

    dashboardItem.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, 1)
      }
    })

    setResizable({
      ...resizable,
      size: map,
    })
  }

  function canIncreaseSize(key: string) {
    let size = resizable.size.get(key)
    if (size === undefined) {
      return false
    }
    return size + 1 < sizes.length
  }

  function canDecreaseSize(key: string) {
    let size = resizable.size.get(key)
    if (size === undefined) {
      return false
    }
    return size > 0
  }

  function doIncreaseSize(key: string) {
    if (canIncreaseSize(key)) {
      let oldSize = resizable.size.get(key) ?? 0

      let map = new Map(resizable.size)
      map.set(key, oldSize + 1)
      setResizable({
        ...resizable,
        size: map,
      })
    }
  }

  function doDecreaseSize(key: string) {
    if (canDecreaseSize(key)) {
      let oldSize = resizable.size.get(key) ?? sizes.length
      let map = new Map(resizable.size)
      map.set(key, oldSize - 1)
      setResizable({
        ...resizable,
        size: map,
      })
    }
  }

  function getSize(key: string) {
    let sizeIndex = resizable.size.get(key) ?? 0
    return sizes[sizeIndex]
  }

  function moveArray(oldIndex: number, newIndex: number) {
    let a: Array<string> = []
    for (let i = 0; i < resizable.order.length; i++) {
      if (i === newIndex) {
        if (oldIndex < newIndex) {
          a.push(resizable.order[i])
          a.push(resizable.order[oldIndex])
        }
        if (oldIndex > newIndex) {
          a.push(resizable.order[oldIndex])
          a.push(resizable.order[i])
        } else {
          a.push(resizable.order[i])
        }
      } else if (i !== oldIndex) {
        a.push(resizable.order[i])
      }
    }
    return a
  }
  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
    updateOrder(moveArray(oldIndex, newIndex))
  }

  return (
    <ResizableContext.Provider
      value={{
        doIncreaseSize,
        doDecreaseSize,
        getSize,
        handleItemUpdate,
        readLayout,
        resizable,
        onSortEnd,
        getWidget,
      }}
    >
      {children}
    </ResizableContext.Provider>
  )
}

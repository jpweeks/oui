import panel from './imperative-api'
import { setAnnotation } from './annotate'

let add = ( obj, propName, annotation, target ) => {
    setAnnotation( target, target.length, { label:propName, ...annotation })
    Object.defineProperty( target, target.length, {
        get: _ => obj[propName],
        set: v => obj[propName] = v,
        enumerable: true, configurable: true,
    })
}

let addFolder = target => ({
    add: ( obj, propName, annotation ) => add( obj, propName, annotation, target ),
    addFolder: propName => addFolder( target[propName] = [] )
})

export default opts => {
    let api = []
    let p = panel(opts)
    let draw = _ => {
        p( api )
        requestAnimationFrame( draw )
    }
    draw()
    return addFolder( api )
}

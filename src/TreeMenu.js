import React, {useState, useMemo} from 'react';

export default function TreeMenu({nodes}) {

    const treeModel = useMemo(() => buildTreeModel(nodes), [nodes]);

    function buildTreeModel(myNodes) {

        let model = {};

        //Construct node map (order n linear construction)
        myNodes.forEach(n => {
            model[n.scenarioId] = {
                id: n.scenarioId,
                name: n.scenarioName,
                parent: n.parentGroupScenario,
                children: []
            }
        });

        //Populate children
        myNodes.forEach(n => {
            if (n.parentGroupScenario) {
                model[n.parentGroupScenario].children.push(model[n.scenarioId]);
            }
        });

        //Convert to root list
        return Object
            .keys(model)
            .map(k => model[k])
            .filter(n => !n.parent);
    }

    return (
        <div style={styles.treeMenuContainer}>
            <div style={styles.treeMenu}>
                {treeModel.map(n => <TreeElement key={n.id} node={n}/>)}
            </div>
        </div>
    );
}

function TreeElement({node}) {
    const hasChildren = useMemo(() => node.children.length > 0, [node]);
    const [hasHover, setHasHover] = useState(false);
    return (
        <div>
            <div style={{...styles.treeElement, ...(hasHover ? styles.hoveredTreeElement : {})}}>
                <div style={styles.leftCol}>
                    {hasChildren && <div>&#9660;</div>}
                </div>
                <div style={styles.elementName}
                     onMouseEnter={() => setHasHover(true)}
                     onMouseLeave={() => setHasHover(false)}>
                    {node.id} - {node.name}
                </div>
            </div>
            {hasChildren && <SubTreeMenu nodes={node.children}/>}
        </div>
    );
}

function SubTreeMenu({nodes}){
    return (
        <div style={styles.treeMenu}>
            {nodes.map(n => <TreeElement key={n.id} node={n}/>)}
        </div>
    );
}

const styles = {
    treeMenuContainer: {
        borderRight: '1px solid #E4E4E4',
        marginRight: 10
    },
    treeMenu: {
        paddingLeft: 15
    },
    treeElement: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        cursor: 'pointer',
        color: '#666666'
    },
    leftCol: {
        width: 20
    },
    elementName: {
        textTransform: 'capitalize'
    },
    hoveredTreeElement: {
        backgroundColor: '#E0E7FF'
    }
};
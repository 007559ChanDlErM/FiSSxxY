// 代码生成时间: 2025-10-06 17:25:49
 * Features:
 * - Creates nodes and edges for the knowledge graph.
 * - Provides methods to add, remove, and query nodes and edges.
 * - Error handling for invalid operations.
 */

import EmberObject from '@ember/object';
import { computed } from '@ember/object/computed';
import { A } from '@ember/array';

// Node class to represent entities in the knowledge graph.
export default class Node extends EmberObject {
  constructor() {
    super(...arguments);
    this.id = null;
    this.attributes = {};
    this.edges = A();
  }

  // Adds an edge to this node.
  addEdge(edge) {
    if (!edge || !edge.type) {
      throw new Error('Edge must have a type');
    }
    this.edges.addObject(edge);
  }

  // Removes an edge from this node.
  removeEdge(edge) {
    this.edges.removeObject(edge);
  }

  // Returns all edges connected to this node.
  getEdges() {
    return this.edges;
  }
}

// Edge class to represent relationships between nodes.
class Edge extends EmberObject {
  constructor() {
    super(...arguments);
    this.type = null;
    this.source = null;
    this.target = null;
  }
}

// KnowledgeGraph class to manage the entire graph.
class KnowledgeGraph extends EmberObject {
  constructor() {
    super(...arguments);
    this.nodes = A();
  }

  // Adds a node to the graph.
  addNode(node) {
    if (!(node instanceof Node)) {
      throw new Error('Only instances of Node can be added');
    }
    this.nodes.addObject(node);
  }

  // Removes a node from the graph.
  removeNode(node) {
    this.nodes.removeObject(node);
  }

  // Adds an edge to connect two nodes.
  addEdge(sourceNode, targetNode, type) {
    const edge = Edge.create({ type, source: sourceNode, target: targetNode });
    sourceNode.addEdge(edge);
    targetNode.addEdge(edge);
  }

  // Removes an edge from the graph.
  removeEdge(edge) {
    edge.source.removeEdge(edge);
    edge.target.removeEdge(edge);
  }

  // Finds nodes by attribute value.
  findNodesByAttribute(attribute, value) {
    return this.nodes.filter(node => node.attributes[attribute] === value);
  }
}

// Example usage:
const graph = KnowledgeGraph.create();

// Create nodes
const nodeA = Node.create({ id: 'NodeA', attributes: { type: 'EntityA' } });
const nodeB = Node.create({ id: 'NodeB', attributes: { type: 'EntityB' } });

// Add nodes to the graph
graph.addNode(nodeA);
graph.addNode(nodeB);

// Add an edge between nodes
graph.addEdge(nodeA, nodeB, 'RELATED_TO');